import { Injectable } from '@nestjs/common';
import { ClienteRepository } from '../repositories/clientes.repository';

@Injectable()
export class ClientesService {
  constructor(private readonly clientRepository: ClienteRepository) {}
}
