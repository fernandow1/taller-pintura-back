import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmpleadoDto } from '@empleados-module/models/dto/create-empleado.dto';
import { EmpleadoRepository } from '@empleados-module/repositories/empleados.repository';
import { Empleado } from '@empleados-module/models/entities/empleado.entity';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';

@Injectable()
export class EmpleadosService {
  constructor(private readonly repository: EmpleadoRepository) {}

  async search(
    pageNumber: number,
    pageSize: number,
    filters?: Partial<Empleado>,
  ): Promise<IPaginated<Empleado>> {
    try {
      return await this.repository.search(pageNumber, pageSize, filters);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    try {
      return await this.repository.save(createEmpleadoDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
