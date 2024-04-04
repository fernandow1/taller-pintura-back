import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDTO } from '@usuarios-module/models/dtos/create-usuario.dto';

export class UpdateUsuarioDTO extends PartialType(CreateUsuarioDTO) {}
