import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma_client/prisma.service';

@Injectable()
export class AccessRoleService {
  constructor(private prisma: PrismaService) {}

  createUserRole(userId: string, accessRoleId: number) {
    return this.prisma.userRole.create({
      data: {
        userId,
        accessRoleId,
      },
    });
  }
}
