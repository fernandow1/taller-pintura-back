import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { ClienteRepository } from '../repositories/clientes.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { Cliente } from '../models/entities/cliente.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockClienteArray,
  mockClienteInternalRepository,
} from './mocks/cliente.mock';

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
        .mockImplementationOnce(() => {});
    });
  });
});
