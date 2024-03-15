import { Controller, Post, Body } from '@nestjs/common';
import { EmpleadosService } from '../services/empleados.service';
import { CreateEmpleadoDto } from '../dto/create-empleado.dto';

@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadosService.create(createEmpleadoDto);
  }
}
