import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmpleadoDto } from '@empleados-module/dto/create-empleado.dto';
import { EmpleadoRepository } from '@empleados-module/repositories/empleados.repository';
import { Empleado } from '@empleados-module/models/entities/empleado.entity';

@Injectable()
export class EmpleadosService {
  constructor(private readonly repository: EmpleadoRepository) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    try {
      return this.repository.save(createEmpleadoDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
