import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDTO } from '@usuarios-module/models/dtos/create-usuario.dto';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { UsuariosService } from '@usuarios-module/services/usuarios.service';

@Controller()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() createUsuarioDTO: CreateUsuarioDTO): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioDTO);
  }
}
