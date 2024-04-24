import { PartialType } from '@nestjs/mapped-types';
import { ClienteComentario } from '@clientes-module/models/entities/cliente-comentario.entity';

export class UpdateClienteComentarioDTO extends PartialType(
  ClienteComentario,
) {}
