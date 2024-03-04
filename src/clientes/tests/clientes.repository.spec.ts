import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClienteRepository } from '@clientes-module/repositories/clientes.repository';
import { Cliente } from '@clientes-module/models/entities/cliente.entity';
import {
  mockClienteArray,
  mockClienteFilter,
  mockClienteInternalRepository,
} from '@clientes-module/tests/mocks/cliente.mock';
import { mockQueryBuilder } from '@shared-module/tests/mocks/typeorm.mock';

describe('ClientesRepository', () => {
  let repository: ClienteRepository;
  let internalRepository: Repository<Cliente>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteRepository,
        {
          provide: getRepositoryToken(Cliente),
          useValue: mockClienteInternalRepository,
        },
      ],
    }).compile();

    repository = module.get<ClienteRepository>(ClienteRepository);
    internalRepository = module.get<Repository<Cliente>>(
      getRepositoryToken(Cliente),
    );
  });

  it('Should be defined', () => {
    expect(repository).toBeDefined();
    expect(internalRepository).toBeDefined();
  });

  describe('search', () => {
    it('should return an array of clients with their total count', async () => {
      const page = faker.number.int({ min: 1, max: 100 });
      const resulSize = faker.number.int({ min: 1, max: 50 });
      const clientsFound = mockClienteArray();
      const clientsCount = clientsFound.length;

      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementationOnce(() => {
          return {
            ...mockQueryBuilder({
              getManyAndCountResponse: [clientsFound, clientsCount],
            }),
          };
        });

      const response = await repository.search(page, resulSize);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeDefined();
      expect(response.count).toEqual(clientsCount);
    });

    it('should return an array of clientes with their total count when applying filters', async () => {
      const page = faker.number.int({ min: 1, max: 50 });
      const resulSize = faker.number.int({ min: 1, max: 50 });
      const clientsFound = mockClienteArray();
      const clientsCount = clientsFound.length;
      const filters = mockClienteFilter();

      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementationOnce(() => {
          return {
            ...mockQueryBuilder({
              getManyAndCountResponse: [clientsFound, clientsCount],
            }),
          };
        });

      const response = await repository.search(page, resulSize, filters);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeDefined();
      expect(response.count).toEqual(clientsCount);
    });
  });
});
