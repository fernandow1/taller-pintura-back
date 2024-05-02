import { Module } from '@nestjs/common';
import { UsuariosService } from '@usuarios-module/services/usuarios.service';
import { UsuariosController } from '@usuarios-module/controllers/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { UsuarioRepository } from '@usuarios-module/repositories/usuarios.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuariosService, UsuarioRepository],
  exports: [UsuariosService],
})
export class UsuariosModule {}
