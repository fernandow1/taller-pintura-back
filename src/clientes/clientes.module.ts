import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from '@clientes-module/services/clientes.service';
import { ClientesController } from '@clientes-module/controllers/clientes.controller';
import { Cliente } from '@clientes-module/models/entities/cliente.entity';
import { ClienteRepository } from '@clientes-module/repositories/clientes.repository';
import { ClientesComentariosController } from '@clientes-module/controllers/clientes-comentarios.controller';
import { ClientesComentariosService } from './services/clientes-comentarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientesController, ClientesComentariosController],
  providers: [ClientesService, ClienteRepository, ClientesComentariosService],
})
export class ClientesModule {}
