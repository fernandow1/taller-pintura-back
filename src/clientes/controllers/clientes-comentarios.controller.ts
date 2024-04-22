import { CreateClienteComentarioDTO } from '@clientes-module/models/dto/create-cliente-comentario.dto';
import { UpdateClienteComentarioDTO } from '@clientes-module/models/dto/update-cliente-comentario.dto';
import { ClienteComentario } from '@clientes-module/models/entities/cliente-comentario.entity';
import { ClientesComentariosService } from '@clientes-module/services/clientes-comentarios.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';
import { PageParamDTO } from '@shared-module/models/dtos/page-param.dto';
import { ResultsQueryDTO } from '@shared-module/models/dtos/results-query.dto';

@Controller('comentarios')
export class ClientesComentariosController {
  constructor(
    private readonly clienteComentarioService: ClientesComentariosService,
  ) {}

  @Get()
  async search(
    @Param() { pageNumber }: PageParamDTO,
    @Query() { results }: ResultsQueryDTO,
    @Query() filters?: Partial<ClienteComentario>,
  ): Promise<IPaginated<ClienteComentario>> {
    return this.clienteComentarioService.search(pageNumber, results, filters);
  }

  @Post()
  async create(
    @Body() dto: CreateClienteComentarioDTO,
  ): Promise<ClienteComentario> {
    return this.clienteComentarioService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClienteComentarioDTO,
  ): Promise<ClienteComentario> {
    return this.clienteComentarioService.update(id, dto);
  }
}
