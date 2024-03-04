import { faker } from '@faker-js/faker';
import { CreateClienteDto } from './../../models/dto/create-cliente.dto';
import { Cliente } from './../../models/entities/cliente.entity';
import { CATEGORIAS } from './../../models/enums/categorias.enum';

export function mockCreateClienteDTO(): CreateClienteDto {
  return new CreateClienteDto(
    faker.helpers.enumValue(CATEGORIAS),
    faker.internet.email(),
    faker.string.alphanumeric(255),
    faker.internet.userName(),
  );
}

export function mockCliente(): Cliente {
  const cliente = new Cliente(
    faker.helpers.enumValue(CATEGORIAS),
    faker.internet.email(),
    faker.string.alphanumeric(255),
    faker.internet.userName(),
    null,
    null,
  );
  cliente.id = faker.number.int({ min: 1, max: 100 });
  return cliente;
}

export function mockClienteFilter(): Partial<Cliente> {
  return new Cliente(
    faker.helpers.enumValue(CATEGORIAS),
    faker.internet.email(),
    faker.string.alpha(),
    faker.string.alpha(),
    faker.person.lastName(),
    faker.person.firstName(),
  );
}

export function mockClienteArray(): Cliente[] {
  return [mockCliente(), mockCliente(), mockCliente()];
}

export const mockClienteInternalRepository = {};
