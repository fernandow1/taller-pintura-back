import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from '@clientes-module/models/dto/create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {}
