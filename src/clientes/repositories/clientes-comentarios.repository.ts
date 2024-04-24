import { ClienteComentario } from '@clientes-module/models/entities/cliente-comentario.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesComentariosRepository {
  constructor(
    @InjectRepository(ClienteComentario)
    private readonly repository: Repository<ClienteComentario>,
  ) {}

  async search(
    page: number,
    resultSize: number,
    filters?: Partial<ClienteComentario>,
  ): Promise<IPaginated<ClienteComentario>> {
    const query = this.repository
      .createQueryBuilder('clientes_comentarios')
      .where('clientes_comentarios.deletedAt IS NULL');

    filters?.comentario &&
      query.andWhere('clientes_comentarios.comentario LIKE :comentario', {
        comentario: filters.comentario,
      });

    const [data, count] = await query
      .orderBy('clientes_comentarios.createdAt', 'DESC')
      .skip(resultSize * (page - 1))
      .take(resultSize)
      .getManyAndCount();

    return { data, count };
  }

  async save(
    comentario: Partial<ClienteComentario>,
  ): Promise<ClienteComentario> {
    return this.repository.save(comentario);
  }

  async findById(id: number): Promise<ClienteComentario> {
    return this.repository.findOneOrFail({
      where: {
        id,
      },
    });
  }
}
