import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from '@empleados-module/models/entities/empleado.entity';
import { Repository } from 'typeorm';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';

export class EmpleadoRepository {
  constructor(
    @InjectRepository(Empleado)
    private readonly repository: Repository<Empleado>,
  ) {}

  async search(
    pageNumber: number,
    pageSize: number,
    filters?: Partial<Empleado>,
  ): Promise<IPaginated<Empleado>> {
    const query = this.repository
      .createQueryBuilder('empleados')
      .where('empleados.deletedAt IS NULL');

    filters?.nombre &&
      query.andWhere('empleados.nombre LIKE :nombre', {
        nombre: `%${filters.nombre}%`,
      });
    filters?.apellido &&
      query.andWhere('empleados.apellido LIKE :apellido', {
        apellido: `%${filters.apellido}%`,
      });
    filters?.email &&
      query.andWhere('empleados.email LIKE :email', {
        email: `%${filters.email}%`,
      });

    const [data, count] = await query
      .orderBy('empleados.createdAt', 'DESC')
      .skip(pageSize * (pageNumber - 1))
      .take(pageSize)
      .getManyAndCount();

    return { data, count };
  }

  async save(empleado: Partial<Empleado>): Promise<Empleado> {
    return this.repository.save(empleado);
  }
}
