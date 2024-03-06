import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from '@clientes-module/services/clientes.service';
import { ClienteRepository } from '@clientes-module/repositories/clientes.repository';
import {
  mockClienteFilter,
  mockClientePaginated,
  mockClienteRepository,
} from '@clientes-module/tests/mocks/cliente.mock';

describe('ClientesService', () => {
  let service: ClientesService;
  let repository: ClienteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        { provide: ClienteRepository, useValue: mockClienteRepository },
      ],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
    repository = module.get<ClienteRepository>(ClienteRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('search', () => {
    it('should return an array of clients with their total count', async () => {
      const page = faker.number.int();
      const pageSize = faker.number.int({ min: 1, max: 50 });

      const response = await service.search(page, pageSize);
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeDefined();
      expect(response.count).toBeGreaterThan(0);
      expect(repository.search).toBeCalledWith(page, pageSize, undefined);
    });

    it('should return an array of clients with their count applying filters', async () => {
      const page = faker.number.int();
      const pageSize = faker.number.int({ min: 1, max: 50 });
      const filters = mockClienteFilter();

      jest
        .spyOn(repository, 'search')
        .mockResolvedValueOnce(mockClientePaginated());

      const response = await service.search(page, pageSize, filters);
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeDefined();
      expect(response.count).toBeGreaterThan(0);
      expect(repository.search).toBeCalledWith(page, pageSize, filters);
    });

    it('should return an empty array if not found registers', async () => {
      const page = faker.number.int();
      const pageSize = faker.number.int({ min: 1, max: 50 });

      jest
        .spyOn(repository, 'search')
        .mockResolvedValueOnce({ data: [], count: 0 });

      const response = await service.search(page, pageSize);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.length).toEqual(0);
      expect(response.count).toBeDefined();
      expect(response.count).toEqual(0);
      expect(repository.search).toBeCalledWith(page, pageSize, undefined);
    });
  });
});
