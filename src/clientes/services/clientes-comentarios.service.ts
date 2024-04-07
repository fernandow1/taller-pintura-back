import { CreateClienteComentarioDTO } from '@clientes-module/models/dto/create-cliente-comentario.dto';
import { ClienteComentario } from '@clientes-module/models/entities/cliente-comentario.entity';
import { ClientesComentariosRepository } from '@clientes-module/repositories/clientes-comentarios.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';

@Injectable()
export class ClientesComentariosService {
  constructor(
    private readonly clienteComentarioRepository: ClientesComentariosRepository,
  ) {}

  async search(
    pageNumber: number,
    pageSize: number,
    filters?: Partial<ClienteComentario>,
  ): Promise<IPaginated<ClienteComentario>> {
    try {
      const comentarios = await this.clienteComentarioRepository.search(
        pageNumber,
        pageSize,
        filters,
      );
      return comentarios;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(
    comentario: CreateClienteComentarioDTO,
  ): Promise<ClienteComentario> {
    return this.save(comentario);
  }

  async save(
    comentario: Partial<ClienteComentario>,
  ): Promise<ClienteComentario> {
    try {
      const savedComentario = await this.clienteComentarioRepository.save(
        comentario,
      );
      return savedComentario;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
