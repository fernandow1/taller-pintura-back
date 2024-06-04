import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDTO {
  @MaxLength(50, {
    message: 'El nombre de usuario no debe exceder los $constraint caracteres.',
  })
  @IsString({ message: 'El formato del nombre de usuario es incorrecto.' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacio' })
  usuario: string;

  @MaxLength(45, {
    message: 'La clave es no debe exceder los $constraint caracteres.',
  })
  @IsString({ message: 'El formato de la clave es incorrecta.' })
  @IsNotEmpty({ message: 'La clave no puede estar vacia' })
  password: string;
}
