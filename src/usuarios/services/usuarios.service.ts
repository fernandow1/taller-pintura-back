import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDTO } from '@usuarios-module/models/dtos/create-usuario.dto';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { UsuarioRepository } from '@usuarios-module/repositories/usuarios.repository';
import { hash } from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async create(usuarioDTO: CreateUsuarioDTO): Promise<Usuario> {
    usuarioDTO.password = await hash(usuarioDTO.password, 10);
    return this.save(usuarioDTO);
  }

  async save(usuario: Partial<Usuario>): Promise<Usuario> {
    try {
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
