import {
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
} from 'typeorm';

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

  @Column('date', { name: 'fecha_nacimiento', nullable: false })
  fechaNacimiento: string;

  @Column('date', { name: 'fecha_inicio_empleo', nullable: false })
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
}
