import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from '@clientes-module/controllers/clientes.controller';
import { ClientesService } from '@clientes-module/services/clientes.service';
import {
  mockClienteFilter,
  mockClientePaginated,
  mockClienteService,
} from '@clientes-module/tests/mocks/cliente.mock';
import {
  mockPaginationDTO,
  mockResultsDTO,
} from '@shared-module/tests/mocks/shared.mock';

describe('ClientesController', () => {
  let controller: ClientesController;
  let service: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [
        ClientesService,
        { provide: ClientesService, useValue: mockClienteService },
      ],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
    service = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('should return an array of clients with their count', async () => {
      const response = await controller.search(
        mockPaginationDTO,
        mockResultsDTO,
      );

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeDefined();
      expect(response.count).toBeGreaterThan(0);
    });

    it('should return an array of clients with their cont applying filters', async () => {
      const filters = mockClienteFilter();

      jest
        .spyOn(service, 'search')
        .mockResolvedValueOnce(mockClientePaginated());

      const response = await controller.search(
        mockPaginationDTO,
        mockResultsDTO,
        filters,
      );

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeDefined();
      expect(response.count).toBeGreaterThan(0);
    });
  });
});
