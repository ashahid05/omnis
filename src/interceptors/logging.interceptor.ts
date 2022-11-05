import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `${request.method} ${request.url} ${Date.now() - now}ms`,
            context.getClass().name,
          ),
        ),
      );
  }
}
