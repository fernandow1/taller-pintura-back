import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { EmpleadosService } from '@empleados-module/services/empleados.service';
import { CreateEmpleadoDto } from '@empleados-module/models/dto/create-empleado.dto';
import { Empleado } from '@empleados-module/models/entities/empleado.entity';
import { PageParamDTO } from '@shared-module/models/dtos/page-param.dto';
import { ResultsQueryDTO } from '@shared-module/models/dtos/results-query.dto';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';

@Controller()
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Get('/page/:pageNumber')
  async search(
    @Param() { pageNumber }: PageParamDTO,
    @Query() { results }: ResultsQueryDTO,
    @Query() filters?: Partial<Empleado>,
  ): Promise<IPaginated<Empleado>> {
    return this.empleadosService.search(pageNumber, results, filters);
  }

  @Post()
  async create(
    @Body() createEmpleadoDto: CreateEmpleadoDto,
  ): Promise<Empleado> {
    return this.empleadosService.create(createEmpleadoDto);
  }
}
