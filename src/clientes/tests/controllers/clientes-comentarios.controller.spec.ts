import { Test, TestingModule } from '@nestjs/testing';
import { ClientesComentariosController } from '@clientes-module/controllers/clientes-comentarios.controller';
import { ClienteComentario } from '@clientes-module/models/entities/cliente-comentario.entity';
import { ClientesComentariosService } from '@clientes-module/services/clientes-comentarios.service';
import {
  mockClienteComentarioFilters,
  mockClienteComentariosService,
  mockCreateClienteComentario,
  mockUpdateClienteComentario,
} from '@clientes-module/tests/mocks/clientes-comentarios.mock';
import {
  mockPaginationDTO,
  mockResultsDTO,
} from '@shared-module/tests/mocks/shared.mock';
import { faker } from '@faker-js/faker';

describe('ClientesComentariosController', () => {
  let controller: ClientesComentariosController;
  let service: ClientesComentariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesComentariosController],
      providers: [
        ClientesComentariosService,
        {
          provide: ClientesComentariosService,
          useValue: mockClienteComentariosService,
        },
      ],
    }).compile();

    controller = module.get<ClientesComentariosController>(
      ClientesComentariosController,
    );
    service = module.get<ClientesComentariosService>(
      ClientesComentariosService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('search', () => {
    it('should return an array of ClienteComentarios without apply filters', async () => {
      const response = await controller.search(
        mockPaginationDTO,
        mockResultsDTO,
      );

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeGreaterThan(0);
      response.data.forEach((clienteComentario: ClienteComentario) => {
        expect(clienteComentario).toBeDefined();
        expect(clienteComentario).toBeInstanceOf(ClienteComentario);
        expect(clienteComentario.id).toBeDefined();
        expect(clienteComentario.comentario).toBeDefined();
        expect(clienteComentario.idCliente).toBeDefined();
      });
      expect(service.search).toBeCalledWith(
        mockPaginationDTO.pageNumber,
        mockResultsDTO.results,
        undefined,
      );
    });

    it('should return an empty array without apply filters', async () => {
      jest
        .spyOn(service, 'search')
        .mockResolvedValueOnce({ data: [], count: 0 });

      const response = await controller.search(
        mockPaginationDTO,
        mockResultsDTO,
      );

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toEqual(0);
      expect(response.count).toEqual(0);
      expect(service.search).toBeCalledWith(
        mockPaginationDTO.pageNumber,
        mockResultsDTO.results,
        undefined,
      );
    });

    it('should return an array of ClienteComentarios applying filters', async () => {
      const filters = mockClienteComentarioFilters();

      const response = await controller.search(
        mockPaginationDTO,
        mockResultsDTO,
        filters,
      );

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeGreaterThan(0);
      response.data.forEach((clienteComentario: ClienteComentario) => {
        expect(clienteComentario).toBeDefined();
        expect(clienteComentario).toBeInstanceOf(ClienteComentario);
        expect(clienteComentario.id).toBeDefined();
        expect(clienteComentario.comentario).toBeDefined();
        expect(clienteComentario.idCliente).toBeDefined();
      });
      expect(service.search).toBeCalledWith(
        mockPaginationDTO.pageNumber,
        mockResultsDTO.results,
        filters,
      );
    });

    it('should return an empty array applying filters', async () => {
      const filters = mockClienteComentarioFilters();

      jest
        .spyOn(service, 'search')
        .mockResolvedValueOnce({ data: [], count: 0 });

      const response = await controller.search(
        mockPaginationDTO,
        mockResultsDTO,
        filters,
      );

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toEqual(0);
      expect(response.count).toEqual(0);
      expect(service.search).toBeCalledWith(
        mockPaginationDTO.pageNumber,
        mockResultsDTO.results,
        filters,
      );
    });
  });

  describe('create', () => {
    it('should save an entity and return it with their attributes', async () => {
      const dto = mockCreateClienteComentario();

      const response = await controller.create(dto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(ClienteComentario);
      expect(response.id).toBeDefined();
      expect(response.comentario).toBeDefined();
      expect(response.idCliente).toBeDefined();
      expect(service.create).toBeCalledWith(dto);
    });

    it('should throw an InternalServerErrorException if something goes wrong', async () => {
      const dto = mockCreateClienteComentario();

      jest
        .spyOn(service, 'create')
        .mockRejectedValueOnce(new Error('Test Error'));

      await expect(controller.create(dto)).rejects.toThrowError(
        Error('Test Error'),
      );
      expect(service.create).toBeCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update an entity and return it with their attributes', async () => {
      const dto = mockUpdateClienteComentario();
      const id = faker.number.int();

      const response = await controller.update(id, dto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(ClienteComentario);
      expect(response.id).toBeDefined();
      expect(response.id).toEqual(id);
      expect(response.comentario).toBeDefined();
      expect(response.comentario).toEqual(dto.comentario);
      expect(response.idCliente).toBeDefined();
      expect(response.idCliente).toEqual(dto.idCliente);
      expect(service.update).toBeCalledWith(id, dto);
    });

    it('should throw an InternalServerErrorException if something goes wrong', async () => {
      const dto = mockUpdateClienteComentario();
      const id = faker.number.int();

      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new Error('Test Error'));

      await expect(controller.update(id, dto)).rejects.toThrowError(
        Error('Test Error'),
      );
      expect(service.update).toBeCalledWith(id, dto);
    });
  });
});
