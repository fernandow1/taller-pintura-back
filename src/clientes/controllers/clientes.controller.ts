import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClientesService } from '@clientes-module/services/clientes.service';
import { PageParamDTO } from '@shared-module/models/dtos/page-param.dto';
import { ResultsQueryDTO } from '@shared-module/models/dtos/results-query.dto';
import { Cliente } from '@clientes-module/models/entities/cliente.entity';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';

@Controller()
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
