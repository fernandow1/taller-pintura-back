import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductoPrecio } from '@productos-module/models/entities/producto-precio.entity';

@Index('name-idx-UNIQUE', ['nombre'], { unique: true })
@Entity('productos', { database: 'taller_pintura' })
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'id_precio', nullable: false })
  idPrecio: number;

  @Column({ name: 'nombre', nullable: false, type: 'varchar', length: 255 })
  nombre: string;

  @Column({ name: 'descripcion', nullable: false, type: 'mediumtext' })
  descripcion: string;

  @Column({ name: 'activo', nullable: false, default: true, type: 'boolean' })
  activo: boolean;

  @OneToMany(() => ProductoPrecio, (productoPrecio) => productoPrecio.producto)
  @JoinColumn({ name: 'id_precio', referencedColumnName: 'id' })
  precios: ProductoPrecio[];
}
