import { HttpStatus, HttpException, Logger } from '@nestjs/common';

export class EmpleadoNotSavedException extends HttpException {
  constructor(stacktrace: string) {
    Logger.error(
      'Ocurrio un error guardando el empleado en la base de datos. Stacktrace: ',
      stacktrace,
    );
    super(
      'El empleado no pudo ser guardado en la base de datos. Intente nuevamnte mas tarde.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
