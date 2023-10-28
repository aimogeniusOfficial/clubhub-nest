import { Module } from '@nestjs/common';
import { AccessRoleService } from './access-role.services';
import { PrismaService } from '../../prisma_client/prisma.service';

@Module({
  imports: [],
  providers: [AccessRoleService, PrismaService],
  exports: [AccessRoleService],
})
export class AccessRoleModule {}
