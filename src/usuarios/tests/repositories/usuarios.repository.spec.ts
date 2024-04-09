import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { UsuarioRepository } from '@usuarios-module/repositories/usuarios.repository';
import { FindOneOptions, Repository } from 'typeorm';
import {
  mockUsuario,
  mockUsuarioArray,
  mockUsuarioFilter,
  mockUsuarioInternalRepository,
} from '@usuarios-module/tests/mocks/usuario.mock';
import { mockQueryBuilder } from '@shared-module/tests/mocks/typeorm.mock';

describe('UsuarioRepository', () => {
  let repository: UsuarioRepository;
  let internalRepository: Repository<Usuario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioRepository,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockUsuarioInternalRepository,
        },
      ],
    }).compile();

    repository = module.get<UsuarioRepository>(UsuarioRepository);
    internalRepository = module.get<Repository<Usuario>>(
      getRepositoryToken(Usuario),
    );
  });

  it('Sohuld be defined', () => {
    expect(repository).toBeDefined();
    expect(internalRepository).toBeDefined();
  });

  describe('find', () => {
    it('should return a Usuario with the same ID', async () => {
      const usuario = mockUsuario();
      const findOptions: FindOneOptions<Usuario> = {
        where: { id: usuario.id },
      };

      jest
        .spyOn(internalRepository, 'findOneOrFail')
        .mockResolvedValueOnce(usuario);

      const response = await repository.findById(usuario.id);
      expect(response).toBeDefined();
      expect(response).toMatchObject(usuario);
      expect(internalRepository.findOneOrFail).toBeCalledWith(findOptions);
    });

    it('should throw an Error if something goes wrong', async () => {
      const id = faker.number.int({ min: 1, max: 100 });
      const findOptions: FindOneOptions<Usuario> = { where: { id } };

      jest
        .spyOn(internalRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('Test error'));

      await expect(repository.findById(id)).rejects.toThrowError(
        Error('Test error'),
      );
      expect(internalRepository.findOneOrFail).toBeCalledWith(findOptions);
    });
  });

  describe('search', () => {
    it('should return an array of Usuarios without apply filters', async () => {
      const pageNumber = faker.number.int({ min: 1, max: 100 });
      const pageSize = faker.number.int({ min: 1, max: 10 });
      const usuarios = mockUsuarioArray();

      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementationOnce(() => {
          return {
            ...mockQueryBuilder({
              getManyAndCountResponse: [usuarios, usuarios.length],
            }),
          };
        });

      const response = await repository.search(pageNumber, pageSize);
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeDefined();
      expect(response.count).toBeGreaterThan(0);
      response.data.forEach((usuario: Usuario) => {
        expect(usuario).toBeDefined();
        expect(usuario).toBeInstanceOf(Usuario);
        expect(usuario.id).toBeDefined();
        expect(usuario.usuario).toBeDefined();
        expect(usuario.password).toBeDefined();
        expect(usuario.idEmpleado).toBeDefined();
      });
    });

    it('should return an array of Usuarios applying filters', async () => {
      const pageNumber = faker.number.int({ min: 1, max: 100 });
      const pageSize = faker.number.int({ min: 1, max: 10 });
      const filter = mockUsuarioFilter();
      const usuarios = mockUsuarioArray();

      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementationOnce(() => {
          return {
            ...mockQueryBuilder({
              getManyAndCountResponse: [usuarios, usuarios.length],
            }),
          };
        });

      const response = await repository.search(pageNumber, pageSize, filter);
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeDefined();
      expect(response.count).toBeGreaterThan(0);
      response.data.forEach((usuario: Usuario) => {
        expect(usuario).toBeDefined();
        expect(usuario).toBeInstanceOf(Usuario);
        expect(usuario.id).toBeDefined();
        expect(usuario.usuario).toBeDefined();
        expect(usuario.password).toBeDefined();
        expect(usuario.idEmpleado).toBeDefined();
      });
    });

    it('should return an empty array applying filters', async () => {
      const pageNumber = faker.number.int({ min: 1, max: 100 });
      const pageSize = faker.number.int({ min: 1, max: 10 });
      const filter = mockUsuario();

      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementationOnce(() => {
          return {
            ...mockQueryBuilder({
              getManyAndCountResponse: [[], 0],
            }),
          };
        });

      const response = await repository.search(pageNumber, pageSize);
      expect(response.data).toBeDefined();
      expect(response.data.length).toEqual(0);
      expect(response.count).toBeDefined();
      expect(response.count).toEqual(0);
    });

    it('should return an empty array without apply filters', async () => {
      const pageNumber = faker.number.int({ min: 1, max: 100 });
      const pageSize = faker.number.int({ min: 1, max: 10 });
      const filter = mockUsuarioFilter();

      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementationOnce(() => {
          return {
            ...mockQueryBuilder({
              getManyAndCountResponse: [[], 0],
            }),
          };
        });

      const response = await repository.search(pageNumber, pageSize, filter);
      expect(response.data).toBeDefined();
      expect(response.data.length).toEqual(0);
      expect(response.count).toBeDefined();
      expect(response.count).toEqual(0);
    });
  });

  describe('save', () => {
    it('should return the saved entity with their ID defined calling the internal repository', async () => {
      const usuario = mockUsuario();

      const response = await repository.save(usuario);

      expect(response).toBeDefined();
      expect(response.id).toEqual(usuario.id);
      expect(response.usuario).toEqual(usuario.usuario);
      expect(response.password).toEqual(usuario.password);
      expect(response.idEmpleado).toEqual(usuario.idEmpleado);
    });

    it('should propagate an error if something fails', async () => {
      const usuario = mockUsuario();

      jest
        .spyOn(internalRepository, 'save')
        .mockRejectedValueOnce(new Error('Test Error'));

      await expect(repository.save(usuario)).rejects.toThrowError(
        Error('Test Error'),
      );
      expect(internalRepository.save).toBeCalledWith(usuario);
    });
  });

  describe('softDelete', () => {
    it('should softDelete call the internal repository', async () => {
      const id = faker.number.int({ min: 1, max: 100 });

      await expect(repository.softDelete(id)).resolves.not.toThrowError();
      expect(internalRepository.softDelete).toBeCalledWith(id);
    });

    it('should propagate an Error if something fails', async () => {
      const id = faker.number.int({ min: 1, max: 100 });

      jest
        .spyOn(internalRepository, 'softDelete')
        .mockRejectedValueOnce(new Error('Test Error'));

      await expect(repository.softDelete(id)).rejects.toThrowError(
        Error('Test Error'),
      );
      expect(internalRepository.softDelete).toBeCalledWith(id);
    });
  });
});
