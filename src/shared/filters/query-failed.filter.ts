import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    Logger.error(
      `Ha ocurrido un error en la Base de Datos. ${exception.message}`,
    );

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message:
        'Ha ocurrido un error en la base de datos. Por favor intente nuevamente mas tarde.',
    });
  }
}
