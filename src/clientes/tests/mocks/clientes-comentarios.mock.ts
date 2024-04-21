import { faker } from '@faker-js/faker';
import { ClienteComentario } from '@clientes-module/models/entities/cliente-comentario.entity';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';

export function mockClienteComentario(): ClienteComentario {
  const clienteComentario = new ClienteComentario(
    faker.string.alpha({ length: 255 }),
    faker.number.int(),
  );
  clienteComentario.id = faker.number.int();
  return clienteComentario;
}

export function mockClienteComentarioArray(): ClienteComentario[] {
  return [
    mockClienteComentario(),
    mockClienteComentario(),
    mockClienteComentario(),
  ];
}

export function mockClienteComentarioPaginated(): IPaginated<ClienteComentario> {
  const clientesComentarios = mockClienteComentarioArray();
  return {
    data: clientesComentarios,
    count: clientesComentarios.length,
  };
}

export function mockClienteComentarioFilters(
  clienteParam?: Partial<ClienteComentario>,
): Partial<ClienteComentario> {
  const clienteComentario = new ClienteComentario(
    faker.string.alpha({ length: 255 }),
    faker.number.int(),
  );
  clienteParam?.comentario &&
    (clienteComentario.comentario = clienteParam.comentario);
  clienteParam?.idCliente &&
    (clienteComentario.idCliente = clienteParam.idCliente);
  return clienteComentario;
}

export const mockClienteComentariosInternalRepository = {
  save: jest.fn().mockResolvedValue(mockClienteComentario()),
  findOneOrFail: jest.fn().mockResolvedValue(mockClienteComentario()),
};
