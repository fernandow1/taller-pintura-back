import { faker } from '@faker-js/faker';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';
import { CreateUsuarioDTO } from '@usuarios-module/models/dtos/create-usuario.dto';
import { UpdateUsuarioDTO } from '@usuarios-module/models/dtos/update-usuario.dto';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';

export function mockUsuario(user?: Partial<Usuario>): Usuario {
  const usuario = new Usuario(
    faker.internet.userName(),
    faker.internet.password(),
    faker.number.int(),
  );
  usuario.id = faker.number.int({ min: 1, max: 100 });
  user?.usuario && (usuario.usuario = user.usuario);
  return usuario;
}

export function mockUsuarioArray(): Usuario[] {
  return [mockUsuario(), mockUsuario()];
}

export function mockUsuarioPaginated(): IPaginated<Usuario> {
  const usuarios = mockUsuarioArray();
  return { data: usuarios, count: usuarios.length };
}

export function mockUsuarioFilter(): Partial<Usuario> {
  return new Usuario(
    faker.internet.userName(),
    faker.internet.password(),
    faker.number.int(),
  );
}

export function mockCreateUsuarioDTO(): CreateUsuarioDTO {
  return new CreateUsuarioDTO(
    faker.internet.userName(),
    faker.internet.password(),
    faker.number.int(),
  );
}

export function mockUpdateUsuarioDTO(): UpdateUsuarioDTO {
  const usuarioDTO = new UpdateUsuarioDTO();
  usuarioDTO.usuario = faker.internet.userName();
  usuarioDTO.password = faker.internet.password();
  usuarioDTO.idEmpleado = faker.number.int();
  return usuarioDTO;
}

export const mockUsuarioService = {};

export const mockUsuarioRepository = {
  search: jest.fn().mockResolvedValue(mockUsuarioPaginated()),
  findById: jest.fn().mockImplementation(async (id: number) => {
    const usuario = mockUsuario();
    usuario.id = id;
    return usuario;
  }),
  save: jest.fn().mockImplementation(async (user: Partial<Usuario>) => {
    const usuarioDTO = mockCreateUsuarioDTO();
    usuarioDTO.id = user.id ? user.id : faker.number.int();
    usuarioDTO.usuario = user.usuario;
    usuarioDTO.password = user.password;
    usuarioDTO.idEmpleado = user.idEmpleado;
    return usuarioDTO;
  }),
  softDelete: jest.fn().mockResolvedValue(null),
};

export const mockUsuarioInternalRepository = {
  findOneOrFail: jest.fn().mockResolvedValue(mockUsuario()),
  save: jest.fn().mockImplementation(async (usuario: Usuario) => {
    const user = mockUsuario();
    user.id = usuario.id;
    user.usuario = usuario.usuario;
    user.password = usuario.password;
    user.idEmpleado = usuario.idEmpleado;
    return user;
  }),
  softDelete: jest.fn().mockResolvedValue(null),
};
