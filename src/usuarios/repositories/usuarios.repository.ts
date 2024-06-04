import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(Usuario) private readonly repository: Repository<Usuario>,
  ) {}

  async search(
    pageNumber: number,
    pageSize: number,
    filters?: Partial<Usuario>,
  ): Promise<IPaginated<Usuario>> {
    const query = this.repository
      .createQueryBuilder('usuarios')
      .where('usuarios.deletedAt IS NULL');

    filters?.usuario &&
      query.andWhere('usuarios.usuario = :usuario', {
        usuario: filters.usuario,
      });

    const [data, count] = await query
      .orderBy('usuarios.createdAt', 'DESC')
      .skip(pageSize * (pageNumber - 1))
      .take(pageSize)
      .getManyAndCount();

    return { data, count };
  }

  async save(usuario: Partial<Usuario>): Promise<Usuario> {
    return this.repository.save(usuario);
  }

  async findById(id: number): Promise<Usuario> {
    return this.repository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async findByUserName(usuario: string): Promise<Usuario> {
    return this.repository.findOneOrFail({
      where: { usuario },
      relations: { empleado: true },
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
