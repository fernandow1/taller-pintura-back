import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClienteRepository } from '@clientes-module/repositories/clientes.repository';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';
import { Cliente } from '@clientes-module/models/entities/cliente.entity';

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
      throw new InternalServerErrorException();
    }
  }
}
