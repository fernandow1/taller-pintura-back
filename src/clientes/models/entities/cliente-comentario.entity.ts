import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cliente } from '@clientes-module/models/entities/cliente.entity';

@Entity('clientes_comentarios', { database: 'taller_pintura' })
export class ClienteComentario {
  constructor(comentario: string, idCliente: number) {
    this.comentario = comentario;
    this.idCliente = idCliente;
  }

  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'id_cliente' })
  idCliente: number;

  @Column({ nullable: false, length: 255 })
  comentario: string;

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

  @ManyToOne(() => Cliente, (cliente) => cliente.comentarios)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: Cliente;
}
