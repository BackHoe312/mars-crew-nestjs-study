import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/user/passport/user.jwt-access.strategy';

export const UserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.userId;
  },
);
