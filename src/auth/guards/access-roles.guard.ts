import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const jwtUserId = request.user?.userId;

    const detailedUser = await this.userService.findUserById(jwtUserId);
    const userRoleNames =
      detailedUser?.userRoles.map((role) => role.accessRole.name) || [];

    return roles.some((role) => userRoleNames.includes(role));
  }
}
