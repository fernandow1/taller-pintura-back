import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoPrecio } from './models/entities/producto-precio.entity';
import { Producto } from './models/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, ProductoPrecio])],
})
export class ProductosModule {}
