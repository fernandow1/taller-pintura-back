import { Module } from '@nestjs/common';
import { EmpleadosService } from '@empleados-module/services/empleados.service';
import { EmpleadosController } from '@empleados-module/controllers/empleados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from '@empleados-module/models/entities/empleado.entity';
import { EmpleadoRepository } from '@empleados-module/repositories/empleados.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Empleado])],
  controllers: [EmpleadosController],
  providers: [EmpleadosService, EmpleadoRepository],
})
export class EmpleadosModule {}
