import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { RpcException, TcpContext } from "@nestjs/microservices";
import { throwError } from "rxjs";

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToRpc().getContext<TcpContext>();
    const pattern = ctx.getPattern();

    const errorResponse = {
      timestamp: new Date().getTime(),
      pattern,
      error: exception.getError(),
    };

    return throwError(() => errorResponse);
  }
}
