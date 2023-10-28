import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * @deprecated it does work if userId is not in the path
 */
export class CurrentUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const userId = request.params.userId;
    const jwtUserId = request.user?.userId;
    if (!userId) {
      throw new BadRequestException(`Must include :userId param`);
    }
    if (!jwtUserId) {
      throw new InternalServerErrorException(
        `Must be used in conjuction with JwtAuthGuard`,
      );
    }
    if (userId !== jwtUserId) {
      throw new UnauthorizedException(`Unauthorized`);
    }
    return true;
  }
}
