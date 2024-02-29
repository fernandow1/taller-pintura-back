import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cliente } from '../models/entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IClient } from '../models/interfaces/client.interface';

@Injectable()
export class ClienteRepository {
  constructor(
    @InjectRepository(Cliente) private readonly repository: Repository<Cliente>,
  ) {}

  async search(
    page: number,
    resultSize: number,
    filters?: Partial<Cliente>,
  ): Promise<IClient> {
    const query = this.repository
      .createQueryBuilder('clientes')
      .where('clientes.deletedAt IS NULL');

    const [clients, count] = await query
      .orderBy('clientes.createdAt', 'DESC')
      .skip(resultSize * (page - 1))
      .take(resultSize)
      .getManyAndCount();

    return;
  }
}
