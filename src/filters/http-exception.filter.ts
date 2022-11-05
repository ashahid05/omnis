import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly config: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorResponse = {
      timestamp: new Date().getTime(),
      path: request.url,
      method: request.method,
      error: {
        code: status,
        message: (exception as any).message.error ?? exception.message ?? null,
      },
    };

    if (status != 404) {
      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(errorResponse),
        "ExceptionFilter",
      );
    }

    response.status(status).json(errorResponse);
  }
}
