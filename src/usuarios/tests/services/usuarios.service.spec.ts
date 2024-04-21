import { faker } from '@faker-js/faker';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IPaginated } from '@shared-module/interfaces/paginated.interface';
import { UpdateUsuarioDTO } from '@usuarios-module/models/dtos/update-usuario.dto';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { UsuarioRepository } from '@usuarios-module/repositories/usuarios.repository';
import { UsuariosService } from '@usuarios-module/services/usuarios.service';
import {
  mockCreateUsuarioDTO,
  mockUpdateUsuarioDTO,
  mockUsuario,
  mockUsuarioFilter,
  mockUsuarioRepository,
} from '@usuarios-module/tests/mocks/usuario.mock';
import * as bcrypt from 'bcrypt';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let repository: UsuarioRepository;
  let pageNumber: number;
  let pageSize: number;
  let id: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        { provide: UsuarioRepository, useValue: mockUsuarioRepository },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    repository = module.get<UsuarioRepository>(UsuarioRepository);

    pageNumber = faker.number.int({ min: 1, max: 50 });
    pageSize = faker.number.int({ min: 1, max: 10 });
    id = faker.number.int({ min: 1, max: 100 });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('search', () => {
    it('should return an array of Usuarios and their count without throw any error', async () => {
      const response = await service.search(pageNumber, pageSize);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeGreaterThan(0);
      response.data.forEach((usuario: Usuario) => {
        expect(usuario).toBeDefined();
        expect(usuario).toBeInstanceOf(Usuario);
        expect(usuario.usuario).toBeDefined();
        expect(usuario.password).toBeDefined();
      });
      expect(repository.search).toBeCalledWith(pageNumber, pageSize, undefined);
    });

    it('should return an array of Usuarios and their count applying filters', async () => {
      const filters = mockUsuarioFilter();

      const response = await service.search(pageNumber, pageSize, filters);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeGreaterThan(0);
      response.data.forEach((usuario: Usuario) => {
        expect(usuario).toBeDefined();
        expect(usuario).toBeInstanceOf(Usuario);
        expect(usuario.usuario).toBeDefined();
        expect(usuario.password).toBeDefined();
      });
      expect(repository.search).toBeCalledWith(pageNumber, pageSize, filters);
    });

    it('should return an empty array without apply filters', async () => {
      const emptyPaginate: IPaginated<Usuario> = { data: [], count: 0 };

      jest.spyOn(repository, 'search').mockResolvedValueOnce(emptyPaginate);

      const response = await service.search(pageNumber, pageSize);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toEqual(0);
      expect(response.count).toEqual(0);
      expect(repository.search).toBeCalledWith(pageNumber, pageSize, undefined);
    });

    it('should return an empty array applying filters', async () => {
      const filters = mockUsuarioFilter();
      const emptyPaginate: IPaginated<Usuario> = { data: [], count: 0 };

      jest.spyOn(repository, 'search').mockResolvedValueOnce(emptyPaginate);

      const response = await service.search(pageNumber, pageSize, filters);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toEqual(0);
      expect(response.count).toEqual(0);
      expect(repository.search).toBeCalledWith(pageNumber, pageSize, filters);
    });
  });

  describe('find', () => {
    it('should return an Entity with their ID defined', async () => {
      const response = await service.findById(id);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.id).toEqual(id);
      expect(response.usuario).toBeDefined();
      expect(response.password).toBeDefined();
      expect(repository.findById).toBeCalledWith(id);
    });

    it('should throw an NotFoundException if something goes wrong', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockRejectedValueOnce(new NotFoundException('Test Error'));

      await expect(service.findById(id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(repository.findById).toBeCalledWith(id);
    });
  });

  describe('create', () => {
    it('should save an entity and return it', async () => {
      const dto = mockCreateUsuarioDTO();

      jest.spyOn(service, 'save');

      const response = await service.create(dto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.id).toBeDefined();
      expect(response.usuario).toBeDefined();
      expect(response.usuario).toEqual(dto.usuario);
      expect(response.password).toBeDefined();
      expect(response.password).toEqual(dto.password);
      expect(service.save).toBeCalledWith(dto);
      expect(repository.save).toBeCalledWith(dto);
    });

    it('should throw an InternalServerErrorException if something fail', async () => {
      const dto = mockCreateUsuarioDTO();

      jest.spyOn(service, 'save');

      jest
        .spyOn(repository, 'save')
        .mockRejectedValueOnce(new InternalServerErrorException());

      await expect(service.create(dto)).rejects.toThrowError(
        InternalServerErrorException,
      );
      expect(service.save).toBeCalledWith(dto);
      expect(repository.save).toBeCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update the entity and return it updated', async () => {
      const dto = mockUpdateUsuarioDTO();
      const password = dto.password;

      jest.spyOn(service, 'findById');
      jest.spyOn(service, 'save');

      const response = await service.update(id, dto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.id).toBeDefined();
      expect(response.id).toEqual(id);
      expect(response.usuario).toBeDefined();
      expect(response.usuario).toEqual(dto.usuario);
      expect(response.password).toBeDefined();
      await expect(
        bcrypt.compare(password, response.password),
      ).resolves.toBeTruthy();
      expect(response.idEmpleado).toBeDefined();
      expect(response.idEmpleado).toEqual(dto.idEmpleado);
      expect(service.findById).toBeCalled();
      expect(service.save).toBeCalled();
      expect(repository.save).toBeCalled();
    });

    it('should return an Usuario without update any attribute', async () => {
      const dto = new UpdateUsuarioDTO(undefined, undefined, undefined);

      jest.spyOn(service, 'findById');
      jest.spyOn(service, 'save');

      const response = await service.update(id, dto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.id).toBeDefined();
      expect(response.id).toEqual(id);
      expect(service.findById).toBeCalled();
      expect(service.save).toBeCalled();
      expect(repository.save).toBeCalled();
    });

    it('should throw an NotFoundException if the requested user is not found', async () => {
      const dto = mockUpdateUsuarioDTO();

      jest
        .spyOn(service, 'findById')
        .mockRejectedValueOnce(new NotFoundException('Test Error'));

      await expect(service.update(id, dto)).rejects.toThrowError(
        NotFoundException,
      );
      expect(service.findById).toBeCalled();
    });

    it('should throw an InternalServerErrorException if someting fail while saving the Usuario', async () => {
      const dto = mockUpdateUsuarioDTO();

      jest
        .spyOn(service, 'save')
        .mockRejectedValueOnce(new InternalServerErrorException('Test Error'));
      jest.spyOn(service, 'findById');

      await expect(service.update(id, dto)).rejects.toThrowError(
        InternalServerErrorException,
      );
      expect(service.findById).toBeCalled();
      expect(service.save).toBeCalled();
    });
  });

  describe('softDelete', () => {
    it('should call the softDelete function of the repository', async () => {
      await expect(service.softDelete(id)).resolves.not.toThrowError();
      expect(repository.softDelete).toBeCalledWith(id);
    });

    it('should throw an InternalServerErrorException if something goes wrong', async () => {
      jest
        .spyOn(repository, 'softDelete')
        .mockRejectedValueOnce(new Error('Test error'));

      await expect(service.softDelete(id)).rejects.toThrowError(
        InternalServerErrorException,
      );
      expect(repository.softDelete).toBeCalledWith(id);
    });
  });

  describe('save', () => {
    it('should return an Usuario entity with their ID defined', async () => {
      const usuario = mockUsuario();

      const response = await service.save(usuario);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.id).toBeDefined();
      expect(response.id).toEqual(usuario.id);
      expect(response.password).toBeDefined();
      expect(response.password).toEqual(usuario.password);
      expect(response.idEmpleado).toBeDefined();
      expect(response.idEmpleado).toEqual(usuario.idEmpleado);
      expect(repository.save).toBeCalledWith(usuario);
    });

    it('should throw an InternalServerErrorException if something goes wrong', async () => {
      const usuario = mockUsuario();

      jest
        .spyOn(repository, 'save')
        .mockRejectedValueOnce(new InternalServerErrorException('Test Error'));
      await expect(service.save(usuario)).rejects.toThrowError(
        InternalServerErrorException,
      );
      expect(repository.save).toBeCalledWith(usuario);
    });
  });
});
