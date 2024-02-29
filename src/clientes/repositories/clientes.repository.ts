import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cliente } from '../models/entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClienteRepository {
  constructor(
    @InjectRepository(Cliente) private readonly repository: Repository<Cliente>,
  ) {}
}
