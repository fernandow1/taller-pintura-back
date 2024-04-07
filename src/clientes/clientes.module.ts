import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from '@clientes-module/services/clientes.service';
import { ClientesController } from '@clientes-module/controllers/clientes.controller';
import { Cliente } from '@clientes-module/models/entities/cliente.entity';
import { ClienteRepository } from '@clientes-module/repositories/clientes.repository';
import { ClientesComentariosController } from '@clientes-module/controllers/clientes-comentarios.controller';
import { ClientesComentariosService } from '@clientes-module/services/clientes-comentarios.service';
import { ClienteComentario } from '@clientes-module/models/entities/cliente-comentario.entity';
import { ClientesComentariosRepository } from '@clientes-module/repositories/clientes-comentarios.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, ClienteComentario])],
  controllers: [ClientesController, ClientesComentariosController],
  providers: [
    ClientesService,
    ClienteRepository,
    ClientesComentariosService,
    ClientesComentariosRepository,
  ],
})
export class ClientesModule {}
