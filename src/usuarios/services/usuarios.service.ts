import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';
import { CreateUsuarioDTO } from '@usuarios-module/models/dtos/create-usuario.dto';
import { UpdateUsuarioDTO } from '@usuarios-module/models/dtos/update-usuario.dto';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { UsuarioRepository } from '@usuarios-module/repositories/usuarios.repository';
import { hash } from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async search(
    pageNumber: number,
    pageSize: number,
    filters?: Partial<Usuario>,
  ): Promise<IPaginated<Usuario>> {
    try {
      const usuarios = await this.usuarioRepository.search(
        pageNumber,
        pageSize,
        filters,
      );
      return usuarios;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, dto: UpdateUsuarioDTO): Promise<Usuario> {
    try {
      await this.findById(id);

      if (dto.password) {
        dto.password = await hash(dto.password, 10);
      }

      return this.save({ id, ...dto });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findById(id: number): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findById(id);
      return usuario;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findByUsuario(usuario: string): Promise<Usuario> {
    try {
      const user = await this.usuarioRepository.findByUserName(usuario);
      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }

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

  async softDelete(id: number): Promise<void> {
    try {
      await this.usuarioRepository.softDelete(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
