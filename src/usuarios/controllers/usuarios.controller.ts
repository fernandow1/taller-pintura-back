import {
  Body,
  Controller,
  Delete,
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
import { CreateUsuarioDTO } from '@usuarios-module/models/dtos/create-usuario.dto';
import { UpdateUsuarioDTO } from '@usuarios-module/models/dtos/update-usuario.dto';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { UsuariosService } from '@usuarios-module/services/usuarios.service';

@Controller()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get('/page/:pageNumber')
  async search(
    @Param() { pageNumber }: PageParamDTO,
    @Query() { results }: ResultsQueryDTO,
    @Query() filters?: Partial<Usuario>,
  ): Promise<IPaginated<Usuario>> {
    return this.usuariosService.search(pageNumber, results, filters);
  }

  @Post()
  async create(@Body() createUsuarioDTO: CreateUsuarioDTO): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioDTO);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUsuarioDTO,
  ): Promise<Usuario> {
    return this.usuariosService.update(id, dto);
  }

  @Delete(':id')
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usuariosService.softDelete(id);
  }
}
