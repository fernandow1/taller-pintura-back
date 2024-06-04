import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos', { database: 'taller_pintura' })
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'id_precio', nullable: false })
  @Column('varchar', { name: 'nombre', nullable: false })
  nombre: string;

  @Column('mediumtext', { name: 'descripcion', nullable: false })
  descripcion: string;
}
