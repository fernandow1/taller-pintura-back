import { Module } from '@nestjs/common';
import { ClientesService } from './services/clientes.service';
import { ClientesController } from './controllers/clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './models/entities/cliente.entity';
import { ClienteRepository } from './repositories/clientes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientesController],
  providers: [ClientesService, ClienteRepository],
})
export class ClientesModule {}
