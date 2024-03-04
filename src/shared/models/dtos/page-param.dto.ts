import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
export class PageParamDTO {
  @IsPositive({ message: 'EL numero de la pagina debe ser positivo.' })
  @IsNumber({}, { message: 'El valor de la pagina debe ser un numero.' })
  @IsNotEmpty({ message: 'El valor de la pagina no puede estar vacio.' })
  @Transform(({ value }) => Number(value))
  pageNumber: number;
}
