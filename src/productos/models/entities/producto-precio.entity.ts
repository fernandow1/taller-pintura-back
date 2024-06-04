import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Producto } from '@productos-module/models/entities/producto.entity';
import { Monedas } from '@shared-module/models/entities/monedas.entity';

@Entity('productos_precios', { database: 'taller_pintura' })
export class ProductoPrecio {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ type: 'int', name: 'id_producto', nullable: false })
  idProducto: number;

  @Column({ type: 'int', name: 'id_moneda', nullable: false })
  idMoneda: number;

  @Column({
    type: 'decimal',
    name: 'precio',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  precio: number;

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
  deletedAt: Date | null;

  @OneToOne(() => Producto)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;

  @OneToOne(() => Monedas)
  @JoinColumn({ name: 'id_moneda', referencedColumnName: 'id' })
  moneda: Monedas;
}
