import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PostgresExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const message = {
      timestamp: new Date().getTime(),
      path: request.url,
      method: request.method,
    };

    if (exception.code === "P2002") {
      // unique constraint violation
      const statusCode = HttpStatus.CONFLICT;
      const error = {
        code: statusCode,
        // get the violated-values (i.g email, username)
        message: `${(exception.meta.target as string[]).join(
          ", ",
        )} must be unique value`,
      };
      return response.status(statusCode).json({
        ...message,
        error,
      });
    }

    // Unexpected db error
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    Logger.error("Unexpected DB Error", exception);
    return response.status(statusCode).json({
      ...message,
      error: { code: statusCode, message: "Unknown database error" },
    });
  }
}
