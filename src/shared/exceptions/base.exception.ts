import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export class BaseException extends HttpException {
  constructor(error: Error | string, statusCode: HttpStatus) {
    if (error instanceof QueryFailedError) {
      throw error;
    }
    super(error['message'] || error, statusCode);
  }
}
