import {
  BadRequestException,
  HttpCode,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { generateInviteCode } from '../../+supabase/utils/generateInviteCode';
import { InviteDto } from './dtos/invite.dto';
import { InvitationStatus, UserInvitation } from '@prisma/client';

// Need to use this line of code every time we work with the database that contains
// +data of type BigInt. NestJS handles +data as JSON files, which do not support
// BigInt type. See https://github.com/prisma/studio/issues/614 for more.

BigInt.prototype['toJSON'] = function () {
  return this.toString();
};
@Injectable()
export class UserInvitationService {
  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
  ) {}

  async getAllInvites(): Promise<UserInvitation[]> {
    try {
      return await this.prisma.userInvitation.findMany();
    } catch (error) {
      throw new Error(`Something went wrong... ${error.message}`);
    }
  }

  @HttpCode(201)
  async createInvite(data: InviteDto): Promise<InviteDto> {
    const userInvite = await this.createInviteRow(data);

    await this.emailService.sendInviteEmail({
      recipientEmail: userInvite.inviteeEmail,
      token: userInvite.token,
    });

    const updatedInvite = await this.updateInviteRow(userInvite);

    return updatedInvite;
  }
  private async createInviteRow(data: InviteDto): Promise<UserInvitation> {
    let userInvite;
    const token = generateInviteCode();
    const createdAt = new Date().toISOString();
    try {
      userInvite = await this.prisma.userInvitation.create({
        data: {
          createdAt: createdAt,
          token: token,
          expirationDate: undefined,
          inviteeEmail: data.inviteeEmail,
          inviterId: data.inviterId,
        },
      });
    } catch (error) {
      throw new BadRequestException(`Bad request, ${error.message}`);
    }
    return userInvite;
  }

  private async updateInviteRow(
    userInvitation: UserInvitation,
  ): Promise<InviteDto> {
    let updatedInvite;
    const expirationDate = new Date(userInvitation.createdAt);
    expirationDate.setDate(expirationDate.getDate() + 1);

    try {
      updatedInvite = await this.prisma.userInvitation.update({
        where: {
          id: userInvitation.id,
        },
        data: {
          expirationDate: expirationDate.toISOString(),
        },
      });
    } catch {
      throw new InternalServerErrorException(
        'Failed to update user-invitation row',
      );
    }

    return updatedInvite;
  }

  findUserInvitationByToken(invitationToken: string) {
    return this.prisma.userInvitation.findFirst({
      where: { token: invitationToken },
    });
  }

  updateUserInvitationStatus(
    userInvitationId: bigint,
    status: InvitationStatus,
  ) {
    return this.prisma.userInvitation.update({
      where: { id: userInvitationId },
      data: { status },
    });
  }
}
