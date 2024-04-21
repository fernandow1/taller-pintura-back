import { Test, TestingModule } from '@nestjs/testing';
import { ClientesComentariosService } from '@clientes-module/services/clientes-comentarios.service';
import {
  mockClienteComentario,
  mockClienteComentarioFilters,
  mockClienteComentarioRepository,
} from '@clientes-module/tests/mocks/clientes-comentarios.mock';
import { faker } from '@faker-js/faker';
import { ClienteComentario } from '@clientes-module/models/entities/cliente-comentario.entity';
import { ClientesComentariosRepository } from '@clientes-module/repositories/clientes-comentarios.repository';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('ClientesComentariosService', () => {
  let service: ClientesComentariosService;
  let repository: ClientesComentariosRepository;
  let pageNumber: number;
  let pageSize: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesComentariosService,
        {
          provide: ClientesComentariosRepository,
          useValue: mockClienteComentarioRepository,
        },
      ],
    }).compile();

    service = module.get<ClientesComentariosService>(
      ClientesComentariosService,
    );
    repository = module.get<ClientesComentariosRepository>(
      ClientesComentariosRepository,
    );
    pageNumber = faker.number.int();
    pageSize = faker.number.int({ min: 1, max: 10 });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return an CLienteComentario if founds one', async () => {
      const id = faker.number.int();

      const response = await service.findById(id);
      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(ClienteComentario);
      expect(response.id).toBeDefined();
      expect(response.id).toEqual(id);
      expect(response.comentario).toBeDefined();
      expect(response.idCliente).toBeDefined();
      expect(repository.findById).toBeCalledWith(id);
    });

    it('should throw an NotFoundException if not found anyone', async () => {
      const id = faker.number.int();

      jest
        .spyOn(repository, 'findById')
        .mockRejectedValueOnce(new Error('Test Error'));

      await expect(service.findById(id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(repository.findById).toBeCalledWith(id);
    });
  });

  describe('search', () => {
    it('should return an array of ClienteComentarios entity without ppply filters', async () => {
      const response = await service.search(pageNumber, pageSize);

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
      expect(repository.search).toBeCalledWith(pageNumber, pageSize, undefined);
    });

    it('should return an empty array without applt filters', async () => {
      jest
        .spyOn(repository, 'search')
        .mockResolvedValueOnce({ data: [], count: 0 });

      const response = await service.search(pageNumber, pageSize);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toEqual(0);
      expect(response.count).toEqual(0);
      expect(repository.search).toBeCalledWith(pageNumber, pageSize, undefined);
    });

    it('should return an array of ClienteComentarios entity applying filters', async () => {
      const filters = mockClienteComentarioFilters();

      const response = await service.search(pageNumber, pageSize, filters);

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
      expect(repository.search).toBeCalledWith(pageNumber, pageSize, filters);
    });

    it('should return an empty array applying filters', async () => {
      const filters = mockClienteComentarioFilters();

      jest
        .spyOn(repository, 'search')
        .mockResolvedValueOnce({ data: [], count: 0 });

      const response = await service.search(pageNumber, pageSize, filters);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toEqual(0);
      expect(response.count).toEqual(0);
      expect(repository.search).toBeCalledWith(pageNumber, pageSize, filters);
    });
  });

  describe('save', () => {
    it('should return an ClienteComentario entity saved', async () => {
      const clienteComentario = mockClienteComentario();

      const response = await service.save(clienteComentario);
      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(ClienteComentario);
      expect(response.id).toBeDefined();
      expect(response.comentario).toBeDefined();
      expect(response.idCliente).toBeDefined();
    });

    it('should throw an InternalServerErrorException if something goes wrong', async () => {
      const clienteComentario = mockClienteComentario();

      jest
        .spyOn(repository, 'save')
        .mockRejectedValueOnce(new Error('Test Error'));

      await expect(service.save(clienteComentario)).rejects.toThrowError(
        InternalServerErrorException,
      );
      expect(repository.save).toBeCalledWith(clienteComentario);
    });
  });
});
