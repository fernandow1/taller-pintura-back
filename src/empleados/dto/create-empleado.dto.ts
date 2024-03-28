import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Empleado } from '@empleados-module/models/entities/empleado.entity';

export class CreateEmpleadoDto extends Empleado {
  @IsString()
  @MaxLength(255, {
    message:
      'El nombre es demasiado largo. Por favor envie una cadena de caracteres valida.',
  })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio.' })
  nombre: string;

  @IsString()
  @MaxLength(255, {
    message:
      'El apellido es demasiado largo. Por favor envie una cadena de caracteres valida.',
  })
  @IsNotEmpty({ message: 'El apellido no puede estar vacio.' })
  apellido: string;

  @IsString()
  @MaxLength(255, {
    message:
      'El dni es incorrecto. Por favor envie una cadena de caracteres valida.',
  })
  @IsNotEmpty({ message: 'El dni no puede estar vacio.' })
  dni: string;

  @IsString()
  @MaxLength(255, {
    message:
      'El correo electronico es incorrecto. Por favor envie una cadena de caracteres valido.',
  })
  @IsNotEmpty({ message: 'El email no puede estar vacio.' })
  email: string;

  @IsDateString(
    { strict: true },
    {
      message:
        'El formato de la fecha de nacimiento es incorrecto. Por favor envie una cadena de caracteres valida.',
    },
  )
  @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacia.' })
  fechaNacimiento: string;

  @IsDateString(
    { strict: true },
    {
      message:
        'El formato de la fecha de inicio de empleo es incorrecto. Por favor envie una cadena de caracteres valida.',
    },
  )
  @IsNotEmpty({ message: 'La fecha de inicio de empleo no puede estar vacia.' })
  fechaInicioEmpleo: string;
}
