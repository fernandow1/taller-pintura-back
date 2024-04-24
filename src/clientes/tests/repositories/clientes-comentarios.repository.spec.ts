import { ClienteComentario } from '@clientes-module/models/entities/cliente-comentario.entity';
import { ClientesComentariosRepository } from '@clientes-module/repositories/clientes-comentarios.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import {
  mockClienteComentario,
  mockClienteComentarioFilters,
  mockClienteComentarioPaginated,
  mockClienteComentariosInternalRepository,
} from '@clientes-module/tests/mocks/clientes-comentarios.mock';
import { mockQueryBuilder } from '@shared-module/tests/mocks/typeorm.mock';
import { faker } from '@faker-js/faker';

describe('ClientesComentariosRepository', () => {
  let repository: ClientesComentariosRepository;
  let internalRepository: Repository<ClienteComentario>;
  let pageNumber: number;
  let pageSize: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesComentariosRepository,
        {
          provide: getRepositoryToken(ClienteComentario),
          useValue: mockClienteComentariosInternalRepository,
        },
      ],
    }).compile();

    repository = module.get<ClientesComentariosRepository>(
      ClientesComentariosRepository,
    );
    internalRepository = module.get<Repository<ClienteComentario>>(
      getRepositoryToken(ClienteComentario),
    );
    pageNumber = faker.number.int();
    pageSize = faker.number.int({ min: 1, max: 10 });
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(internalRepository).toBeDefined();
  });

  describe('search', () => {
    it('Should return an array of ClienteComentarios with their count without apply filters', async () => {
      const clientesComentarios = mockClienteComentarioPaginated();

      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementation(() => {
          return {
            ...mockQueryBuilder({
              getManyAndCountResponse: [
                clientesComentarios.data,
                clientesComentarios.count,
              ],
            }),
          };
        });

      const response = await repository.search(pageNumber, pageSize);
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeGreaterThan(0);
      response.data.forEach((comment: ClienteComentario) => {
        expect(comment.id).toBeDefined();
        expect(comment.comentario).toBeDefined();
        expect(comment.idCliente).toBeDefined();
      });
    });

    it('should reutrn an empty array with their count without apply filters', async () => {
      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementation(() => {
          return {
            ...mockQueryBuilder({
              getManyAndCountResponse: [[], 0],
            }),
          };
        });

      const response = await repository.search(pageNumber, pageSize);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toEqual(0);
      expect(response.count).toEqual(0);
    });

    it('should return an ClienteComentarios array and their count applting filters', async () => {
      const clientesComentarios = mockClienteComentarioPaginated();
      const filters = mockClienteComentarioFilters();

      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementation(() => {
          return {
            ...mockQueryBuilder({
              getManyAndCountResponse: [
                clientesComentarios.data,
                clientesComentarios.count,
              ],
            }),
          };
        });

      const response = await repository.search(pageNumber, pageSize, filters);
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeGreaterThan(0);
      response.data.forEach((comment: ClienteComentario) => {
        expect(comment.id).toBeDefined();
        expect(comment.comentario).toBeDefined();
        expect(comment.idCliente).toBeDefined();
      });
    });

    it('should return an empty array with their count applying filters', async () => {
      const filters = mockClienteComentarioFilters();

      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementation(() => {
          return {
            ...mockQueryBuilder({
              getManyAndCountResponse: [[], 0],
            }),
          };
        });

      const response = await repository.search(pageNumber, pageSize, filters);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toEqual(0);
      expect(response.count).toEqual(0);
    });
  });

  describe('save', () => {
    it('should return an ClienteCOmentario entity with ther ID defined', async () => {
      const clienteComentario = mockClienteComentario();

      const response = await repository.save(clienteComentario);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(ClienteComentario);
      expect(response.id).toBeDefined();
      expect(response.comentario).toBeDefined();
      expect(response.idCliente).toBeDefined();
      expect(internalRepository.save).toBeCalledWith(clienteComentario);
    });

    it('should throw an Error if something goes wrong', async () => {
      const clienteComentario = mockClienteComentario();

      jest
        .spyOn(internalRepository, 'save')
        .mockRejectedValueOnce(new Error('Test Error'));

      await expect(repository.save(clienteComentario)).rejects.toThrowError(
        Error('Test Error'),
      );
      expect(internalRepository.save).toBeCalledWith(clienteComentario);
    });
  });

  describe('findById', () => {
    it('should return an ClienteComentario entity if found one', async () => {
      const id = faker.number.int();
      const findOption: FindOneOptions<ClienteComentario> = { where: { id } };

      const response = await repository.findById(id);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(ClienteComentario);
      expect(response.id).toBeDefined();
      expect(response.comentario).toBeDefined();
      expect(response.idCliente).toBeDefined();
      expect(internalRepository.findOneOrFail).toBeCalledWith(findOption);
    });

    it('should throw an Error if not found anyone', async () => {
      const id = faker.number.int();
      const findOption: FindOneOptions<ClienteComentario> = { where: { id } };

      jest
        .spyOn(internalRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('Test Error'));

      await expect(repository.findById(id)).rejects.toThrowError(
        Error('Test Error'),
      );
      expect(internalRepository.findOneOrFail).toBeCalledWith(findOption);
    });
  });
});
