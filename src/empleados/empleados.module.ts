import { Module } from '@nestjs/common';
import { EmpleadosService } from './services/empleados.service';
import { EmpleadosController } from './controllers/empleados.controller';

@Module({
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
})
export class EmpleadosModule {}
