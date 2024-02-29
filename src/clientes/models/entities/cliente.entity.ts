import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { CATEGORIAS } from '../enums/categorias.enum';

@Entity('clientes', { database: 'taller_pintura' })
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column('varchar', { nullable: true, length: 255 })
  nombre: string;

  @Column('varchar', { nullable: true, length: 255 })
  apellido: string;

  @Column('varchar', { nullable: true, length: 255 })
  razonSocial: string;

  @Column('varchar', { nullable: true, length: 255 })
  dni: string;

  @Column('varchar', { nullable: true, length: 255 })
  email: string;

  @Column({
    type: 'enum',
    enum: CATEGORIAS,
    default: CATEGORIAS.PRIVADO,
  })
  categoria: CATEGORIAS;
}
