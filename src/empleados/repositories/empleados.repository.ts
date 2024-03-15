import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from '@empleados-module/models/entities/empleado.entity';
import { Repository } from 'typeorm';

export class EmpleadoRepository {
  constructor(
    @InjectRepository(Empleado)
    private readonly repositry: Repository<Empleado>,
  ) {}

  async save(empleado: Partial<Empleado>): Promise<Empleado> {
    return this.repositry.save(empleado);
  }
}
