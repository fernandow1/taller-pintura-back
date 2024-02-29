import { Transform } from 'class-transformer';
import { Min, Max, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class ResultsQueryDTO {
  @Max(50, {
    message: 'La cantidad de resultados no pueden ser mayor a $constraint1',
  })
  @Min(10, {
    message: 'La cantidad de resultados no puede ser inferior a $constraint1',
  })
  @IsNumber(
    {},
    { message: 'La cantidad de resultados por pagina debe ser un numero' },
  )
  @IsPositive({
    message: 'La cantidad de resultados por pagina debe ser positiva',
  })
  @IsNotEmpty({
    message: 'La cantidad de resultados por pagina no puede estar vacío.',
  })
  @Transform(({ value }) => Number(value))
  results = 10;
}
