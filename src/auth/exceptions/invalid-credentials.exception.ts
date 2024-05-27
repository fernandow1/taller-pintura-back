import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor(username: string) {
    super(
      'El usuario o clave proporcionados son incorrectos.',
      HttpStatus.NOT_ACCEPTABLE,
    );
    Logger.error(
      `La clave proporcionada para el usuario ${username} es incorrecta.`,
      'AuthModule',
    );
  }
}
