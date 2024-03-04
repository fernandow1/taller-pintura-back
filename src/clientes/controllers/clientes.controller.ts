import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClientesService } from '../services/clientes.service';
import { PageParamDTO } from 'src/shared/models/dtos/page-param.dto';
import { ResultsQueryDTO } from 'src/shared/models/dtos/results-query.dto';
import { Cliente } from '../models/entities/cliente.entity';
import { IPaginated } from 'src/shared/interfaces/paginated.interface';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get('page/:pageNumber')
  async search(
    @Param() { pageNumber }: PageParamDTO,
    @Query() { results }: ResultsQueryDTO,
    @Query() filters?: Partial<Cliente>,
  ): Promise<IPaginated<Cliente>> {
    return this.clientesService.search(pageNumber, results, filters);
  }
}
