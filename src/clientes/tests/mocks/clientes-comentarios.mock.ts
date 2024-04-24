import { faker } from '@faker-js/faker';
import { ClienteComentario } from '@clientes-module/models/entities/cliente-comentario.entity';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';
import { CreateClienteComentarioDTO } from '@clientes-module/models/dto/create-cliente-comentario.dto';
import { UpdateClienteComentarioDTO } from '@clientes-module/models/dto/update-cliente-comentario.dto';

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

export function mockCreateClienteComentario(): CreateClienteComentarioDTO {
  return new CreateClienteComentarioDTO(
    faker.string.alpha(255),
    faker.number.int(),
  );
}

export function mockUpdateClienteComentario(): UpdateClienteComentarioDTO {
  const updateDTO = new UpdateClienteComentarioDTO();
  updateDTO.comentario = faker.string.alpha(255);
  updateDTO.idCliente = faker.number.int();
  return updateDTO;
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

export const mockClienteComentarioRepository = {
  findById: jest.fn().mockImplementation(async (id: number) => {
    const clienteComentario = mockClienteComentario();
    clienteComentario.id = id;
    return clienteComentario;
  }),
  search: jest.fn().mockResolvedValue(mockClienteComentarioPaginated()),
  save: jest.fn().mockResolvedValue(mockClienteComentario()),
};

export const mockClienteComentariosService = {
  search: jest.fn().mockResolvedValue(mockClienteComentarioPaginated()),
  create: jest.fn().mockResolvedValue(mockClienteComentario()),
  update: jest
    .fn()
    .mockImplementation(
      async (id: number, comentarioParam: Partial<ClienteComentario>) => {
        const dto = mockClienteComentario();
        dto.id = id;
        comentarioParam?.comentario &&
          (dto.comentario = comentarioParam.comentario);
        comentarioParam?.idCliente &&
          (dto.idCliente = comentarioParam.idCliente);
        return dto;
      },
    ),
};
