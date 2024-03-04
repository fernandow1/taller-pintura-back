import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '@clientes-module/models/entities/cliente.entity';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';

@Injectable()
export class ClienteRepository {
  constructor(
    @InjectRepository(Cliente) private readonly repository: Repository<Cliente>,
  ) {}

  async search(
    page: number,
    resultSize: number,
    filters?: Partial<Cliente>,
  ): Promise<IPaginated<Cliente>> {
    const query = this.repository
      .createQueryBuilder('clientes')
      .where('clientes.deletedAt IS NULL');
    filters?.nombre &&
      query.andWhere('clientes.nombre LIKE :nombre', {
        nombre: `%${filters.nombre}%`,
      });
    filters?.apellido &&
      query.andWhere('clientes.apellido LIKE :apellido', {
        apellido: `%${filters.apellido}%`,
      });
    filters?.razonSocial &&
      query.andWhere('clientes.razonSocial LIKE :razonSocial', {
        razonSocial: `%${filters.razonSocial}%`,
      });
    filters?.email &&
      query.andWhere('clientes.email LIKE :email', {
        email: `%${filters.email}%`,
      });

    const [data, count] = await query
      .orderBy('clientes.createdAt', 'DESC')
      .skip(resultSize * (page - 1))
      .take(resultSize)
      .getManyAndCount();

    return {
      data,
      count,
    };
  }
}
