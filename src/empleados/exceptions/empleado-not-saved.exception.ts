import { HttpStatus, Logger } from '@nestjs/common';
import { BaseException } from '@shared-module/exceptions/base.exception';

export class EmpleadoNotSavedException extends BaseException {
  constructor(error: Error) {
    super(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
