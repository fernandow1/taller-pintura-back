import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateUsuarioDTO extends Usuario {
  @MaxLength(50, {
    message:
      'La cantidad maxima de caracteres para el usuario es de $constraint1',
  })
  @IsString({
    message:
      'El formato del usuario no es valido. Por favor envie una cadena de caracteres valida.',
  })
  @IsNotEmpty({ message: 'El usuario no puede estar vacio.' })
  usuario: string;

  @MaxLength(255, {
    message:
      'La cantidad maxima de caracteres para la clave es de $constraint1',
  })
  @IsString({
    message:
      'El formato de la clave no es valido. Por favor envie una cadena de caracteres valida.',
  })
  @IsNotEmpty({ message: 'La clave no puede estar vacia.' })
  password: string;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsNotEmpty({ message: 'Debe asignar un empleado para el usuario.' })
  idEmpleado: number;
}
