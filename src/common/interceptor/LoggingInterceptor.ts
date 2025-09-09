import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CommonResponse } from '../response/api.response';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor() {}

  private logger = new Logger(LoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user || null;

    this.logger.log(
      `[Request] ${request.method} : ${request.url} ${JSON.stringify(request.query)}
       ${JSON.stringify(request.body)} ${request.ip} ${user ? JSON.stringify(user) : 'N/A'}`,
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          this.logger.log(
            `[Response] ${response.statusCode} : ${JSON.stringify(data)}`,
          );
        },
        error: (error) => {
          this.logger.error(
            `[Response] ${error?.status} : ${JSON.stringify(error?.message)}`,
          );
        },
      }),
    );
  }
}
