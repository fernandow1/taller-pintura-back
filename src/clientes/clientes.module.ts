import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from '@clientes-module/services/clientes.service';
import { ClientesController } from '@clientes-module/controllers/clientes.controller';
import { Cliente } from '@clientes-module/models/entities/cliente.entity';
import { ClienteRepository } from '@clientes-module/repositories/clientes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientesController],
  providers: [ClientesService, ClienteRepository],
})
export class ClientesModule {}
