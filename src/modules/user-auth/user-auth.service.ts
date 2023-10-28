import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  AuthResponse,
  SignInWithPasswordlessCredentials,
  SupabaseClient,
  VerifyEmailOtpParams,
} from '@supabase/supabase-js';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { SupabaseClientService } from '../../+supabase/supabase-client/supabase-client.service';
import { SignUpDto } from './dtos/sing-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { SubscriptionPlanType, UserService } from '../../user/user.service';
import { UserSubscriptionService } from '../user-subscription/user-subscription.service';
import { VaultService } from '../vault/vault.service';
import { FeatureFlagService } from '../feature-flag/feature-flag.service';
import { UserInvitationService } from '../../user/user-invitation/user-invitation.service';
import { InvitationStatus } from '@prisma/client';
import { AccessRoleService } from '../access-role/access-role.services';
import { AccessRoleType } from '../access-role/access-role.enum';

@Injectable()
export class UserAuthService {
  private readonly supabase: SupabaseClient;

  constructor(
    private accessRoleService: AccessRoleService,
    private featureFlagService: FeatureFlagService,
    private readonly supabaseClient: SupabaseClientService,
    private readonly prisma: PrismaService,
    private userService: UserService,
    private userSubscriptionService: UserSubscriptionService,
    private userInvitationService: UserInvitationService,
    private vaultService: VaultService,
  ) {
    this.supabase = this.supabaseClient.useSupabase();
  }

  /**
   * Signs up user with supabase client
   * Creates platform public schema user (separate from auth supabase)
   * Assign correct role to the user
   * Creates initial free subscription for the user
   */
  async handleSignUp(payload: SignUpDto): Promise<AuthResponse> {
    const isInviteOnlyEnabled = await this.featureFlagService.isFeatureEnabled(
      'INVITE_ONLY_SIGNUP',
    );

    if (isInviteOnlyEnabled) {
      if (payload.token === null) {
        throw new InternalServerErrorException(
          `Invite only enabled, but no token provided`,
        );
      }

      const inviteRow =
        await this.userInvitationService.findUserInvitationByToken(
          payload.token,
        );

      if (inviteRow?.status !== InvitationStatus.PENDING) {
        throw new BadRequestException(`Invite is not valid`);
      }

      await this.userInvitationService.updateUserInvitationStatus(
        inviteRow.id,
        InvitationStatus.ACCEPTED,
      );
    }

    // Only PENDING invites can be used if INVITE_ONLY_SIGNUP is enabled
    const { username, name, birthdate, ...supabaseSignUpCredentials } = payload;

    if (username.length < 3) {
      throw new BadRequestException(
        `Username must be at least 3 characters long`,
      );
    }
    const newAuthUser = await this.supabase.auth.signUp(
      supabaseSignUpCredentials,
    );

    if (newAuthUser.error) {
      throw new InternalServerErrorException(
        `Could not create a user ${newAuthUser.error.message}`,
      );
    }

    try {
      const { user } = newAuthUser.data;
      const newUser = await this.userService.createUser(user, {
        username,
        name,
        birthdate: new Date(birthdate),
      });

      // Create entities - after successfully creating a user
      await this.accessRoleService.createUserRole(
        newUser.id,
        AccessRoleType.GROWER,
      );
      await this.userSubscriptionService.createInitialFreeSubscription(
        newUser.id,
      );
      await this.vaultService.createUserVault(newUser.id);

      // Create vault for user
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not create a user ${error.message}`,
      );
    }

    return newAuthUser;
  }

  async handleSignIn(payload: SignInDto): Promise<AuthResponse> {
    try {
      const userLogin = {
        email: payload.usernameOrEmail,
        password: payload.password,
      };
      const isEmail = /^\S+@\S+$/.test(payload.usernameOrEmail);

      if (!isEmail) {
        const user = await this.userService.findUserByUsername(
          payload.usernameOrEmail,
        );
        userLogin.email = user.email;
      }

      return this.supabase.auth.signInWithPassword(userLogin);
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not sign in: ${error.message}`,
      );
    }
  }

  async getUsernameById(id: string): Promise<{ username: string }> {
    const user = await this.userService.findUserById(id);
    return { username: user.username };
  }

  async handleUsernameValidation(username: string): Promise<boolean> {
    const user = await this.userService.findUserByUsername(username);
    return !!user;
  }

  async handleSignInWithOTP(
    payload: SignInWithPasswordlessCredentials,
  ): Promise<AuthResponse> {
    try {
      return this.supabase.auth.signInWithOtp({
        ...payload,
        options: {
          shouldCreateUser: false,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not sign in, ${error.message}`,
      );
    }
  }

  async verifyOTP(payload: VerifyEmailOtpParams): Promise<AuthResponse> {
    try {
      return this.supabase.auth.verifyOtp(payload);
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not verify OTP, ${error.message}`,
      );
    }
  }
}
