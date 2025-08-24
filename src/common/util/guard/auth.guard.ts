import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];
    const parsedUserId = Number(userId);

    if (!userId || Number.isNaN(parsedUserId))
      throw new BadRequestException('Missing x-user-id header');

    request.userId = parsedUserId;

    return true;
  }
}
