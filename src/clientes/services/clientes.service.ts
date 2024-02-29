import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClienteRepository } from '../repositories/clientes.repository';
import { IPaginated } from 'src/shared/interfaces/paginated.interface';
import { Cliente } from '../models/entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(private readonly clientRepository: ClienteRepository) {}

  async search(
    page: number,
    pageSize: number,
    filters?: Partial<Cliente>,
  ): Promise<IPaginated<Cliente>> {
    try {
      return this.clientRepository.search(page, pageSize, filters);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
