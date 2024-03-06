import { IsDateString, IsString, MaxLength } from 'class-validator';

export class CreateEmpleadoDto {
  @IsString()
  @MaxLength(255)
  nombre: string;

  @IsString()
  @MaxLength(255)
  apellido: string;

  @IsString()
  @MaxLength(255)
  dni: string;

  @IsString()
  @MaxLength(255)
  email: string;

  @IsDateString()
  fechaNacimiento: string;
}
