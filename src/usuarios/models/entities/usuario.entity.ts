import { Empleado } from '@empleados-module/models/entities/empleado.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('usuario_UNIQUE', ['usuario'], { unique: true })
@Entity('usuarios', { database: 'taller_pintura' })
export class Usuario {
  constructor(usuario: string, password: string, idEmpleado: number) {
    this.usuario = usuario;
    this.password = password;
    this.idEmpleado = idEmpleado;
  }

  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column('varchar', { length: 50, nullable: false })
  usuario: string;

  @Exclude()
  @Column('varchar', { length: 255, nullable: false })
  password: string;

  @Column('int', { name: 'id_empleado', nullable: false })
  idEmpleado: number;

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

  @ManyToOne(() => Empleado, (empleado) => empleado.usuario)
  @JoinColumn({ name: 'id_empleado', referencedColumnName: 'id' })
  empleado: Empleado;
}
