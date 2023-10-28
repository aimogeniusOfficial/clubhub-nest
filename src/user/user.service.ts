import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma_client/prisma.service';
import { AccessRole, SubscriptionPlan, User, UserRole } from '@prisma/client';

interface UserWithRoles extends User {
  userRoles: (UserRole & { accessRole: AccessRole })[];
}
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  username: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionPlanId: number;
  subscriptionUsage: any;
  roles: UserRole[];
  subscription: {
    activationDate: Date;
    expiryDate: Date;
  };
}

export enum SubscriptionPlanType {
  FREE = 1,
  GROWER = 2,
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findUserById(id: string): Promise<UserWithRoles | undefined> {
    return this.prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        userRoles: {
          include: {
            accessRole: true,
          },
        },
      },
    });
  }

  findUserByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  findUserByUsername(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });
  }

  createUser(user: any, data: Partial<User>): Promise<User> {
    return this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: data.name,
        username: data.username,
        birthdate: data.birthdate,
      },
    });
  }
}
