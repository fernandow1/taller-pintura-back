import { HttpStatus, HttpException, Logger } from '@nestjs/common';
import { BaseException } from '@shared-module/exceptions/base.exception';

export class EmpleadoNotSavedException extends BaseException {
  constructor(error: Error) {
    super(error, HttpStatus.INTERNAL_SERVER_ERROR);
    Logger.error(
      'Ocurrio un error guardando el empleado en la base de datos. Stacktrace: ',
      error,
    );
  }
}
