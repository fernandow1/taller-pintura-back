import {
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  OneToMany,
} from 'typeorm';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as dayjs from 'dayjs';

dayjs.extend(customParseFormat);

@Index('dni-idx-UNIQUE', ['dni'], { unique: true })
@Entity('empleados', { database: 'taller_pintura' })
export class Empleado {
  constructor(
    nombre: string,
    apellido: string,
    dni: string,
    email: string,
    fechaNacimiento: string,
    fechaInicioEmpleado: string,
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.fechaNacimiento = fechaNacimiento;
    this.fechaInicioEmpleo = fechaInicioEmpleado;
  }

  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  nombre: string;

  @Column('varchar', { length: 255, nullable: false })
  apellido: string;

  @Column('varchar', { length: 255, nullable: false })
  dni: string;

  @Column('varchar', { length: 255, nullable: false })
  email: string;

  @Column('date', {
    name: 'fecha_nacimiento',
    nullable: false,
    transformer: {
      to(value: string): string {
        return dayjs(value, 'DD-MM-YYYY').format('YYYY-MM-DD');
      },
      from(value: string) {
        return value;
      },
    },
  })
  fechaNacimiento: string;

  @Column('date', {
    name: 'fecha_inicio_empleo',
    nullable: false,
    transformer: {
      to(value: string): string {
        return dayjs(value, 'DD-MM-YYYY').format('YYYY-MM-DD');
      },
      from(value: string) {
        return value;
      },
    },
  })
  fechaInicioEmpleo: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'createdAt',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updatedAt',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deletedAt',
  })
  deletedAt: Date;

  @OneToMany(() => Usuario, (usuario) => usuario.empleado)
  usuario: Usuario[];
}
