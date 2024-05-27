import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUsuarioDTO {
  @MaxLength(50, {
    message: 'La clave debe tener como maximo $constraint caracteres.',
  })
  @MinLength(3, {
    message: 'La clave no puede tener menos de $constraint caracteres.',
  })
  @IsString({ message: 'Debe proporcionar una clave valida.' })
  usuario: string;

  @MaxLength(255, {
    message: 'La clave debe tener como maximo $constraint caracteres.',
  })
  @MinLength(8, {
    message: 'La clave no puede tener menos de $constraint caracteres.',
  })
  @IsString({ message: 'Debe proporcionar una clave valida.' })
  password: string;
}
