import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(Usuario) private readonly repository: Repository<Usuario>,
  ) {}

  async save(usuario: Partial<Usuario>): Promise<Usuario> {
    return this.repository.save(usuario);
  }
}
