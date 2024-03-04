import { IsString, IsOptional, MaxLength, IsEnum } from 'class-validator';
import { CATEGORIAS } from '@clientes-module/models/enums/categorias.enum';
import { Cliente } from '@clientes-module/models/entities/cliente.entity';

export class CreateClienteDto extends Cliente {
  @IsString({
    message:
      'El formato del nombre es incorrecto. Por favor envie una cadena de caracteres valida.',
  })
  @MaxLength(255, {
    message: 'El nombre no puede exceder los $constraint1 caracteres.',
  })
  @IsOptional()
  nombre: string;

  @IsString({
    message:
      'El formato del apellido es incorrecto. Por favor envie una cadena de caracteres valida.',
  })
  @MaxLength(255, {
    message: 'El apellido no puede exceder los $constraint1 caracteres.',
  })
  @IsOptional()
  apellido: string;

  @IsString({
    message:
      'El formato de la razon social es incorrecta. Por favor envie una cadena de caracteres valida.',
  })
  @MaxLength(255, {
    message: 'La razon social no puede exceder los $constraint1 caracteres.',
  })
  @IsOptional()
  razonSocial: string;

  @IsString({
    message:
      'El formato del dni es incorrecto. Por favoe envie una cadena de caracteres valida.',
  })
  @MaxLength(255, {
    message: 'El dni no puede exceder los $constraint1 caracteres.',
  })
  @IsOptional()
  dni: string;

  @IsString({
    message:
      'El formato del email es incorrecto. Por favor envie una cadena de caracteres valida.',
  })
  @MaxLength(255, {
    message: 'El email no puede exceder los $constraint1 caracteres.',
  })
  email: string;

  @IsEnum(CATEGORIAS)
  categoria: CATEGORIAS;
}
