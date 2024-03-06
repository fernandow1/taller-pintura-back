import { faker } from '@faker-js/faker';
import { CreateClienteDto } from '@clientes-module/models/dto/create-cliente.dto';
import { Cliente } from '@clientes-module/models/entities/cliente.entity';
import { CATEGORIAS } from '@clientes-module/models/enums/categorias.enum';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';

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
    faker.person.lastName(),
    faker.person.firstName(),
  );
}

export function mockClienteArray(): Cliente[] {
  return [mockCliente(), mockCliente(), mockCliente()];
}

export function mockClientePaginated(): IPaginated<Cliente> {
  return {
    data: mockClienteArray(),
    count: mockClienteArray().length,
  };
}

export const mockClienteInternalRepository = {};
export const mockClienteRepository = {
  search: jest.fn().mockResolvedValueOnce(mockClientePaginated()),
};
export const mockClienteService = {
  search: jest.fn().mockResolvedValueOnce(mockClientePaginated()),
};
