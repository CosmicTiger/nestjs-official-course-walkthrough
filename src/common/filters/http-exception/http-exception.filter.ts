import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus ? exception.getStatus() : 500;
    const exceptionResponse = exception.getResponse
      ? exception.getResponse()
      : { message: `Internal server error ${exception.message}` };
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
