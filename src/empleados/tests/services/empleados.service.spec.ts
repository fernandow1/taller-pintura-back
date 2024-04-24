import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadosService } from '@empleados-module/services/empleados.service';
import { EmpleadoRepository } from '@main-module/empleados/repositories/empleados.repository';
import {
  mockCreateEmpleadoDTO,
  mockEmpleadoFilters,
  mockEmpleadoPaginated,
  mockEmpleadoRepository,
} from '@empleados-module/tests/mocks/empleado.mock';
import { Empleado } from '@empleados-module/models/entities/empleado.entity';
import { InternalServerErrorException } from '@nestjs/common';

describe('EmpleadosService', () => {
  let service: EmpleadosService;
  let repository: EmpleadoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpleadosService,
        { provide: EmpleadoRepository, useValue: mockEmpleadoRepository },
      ],
    }).compile();

    service = module.get<EmpleadosService>(EmpleadosService);
    repository = module.get<EmpleadoRepository>(EmpleadoRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should create an Employee and call the repository', async () => {
      const empleadoDTO = mockCreateEmpleadoDTO();

      const response = await service.create(empleadoDTO);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Empleado);
      expect(response.id).toBeDefined();
      expect(response.nombre).toBeDefined();
      expect(response.apellido).toBeDefined();
      expect(response.dni).toBeDefined();
      expect(response.email).toBeDefined();
      expect(response.fechaNacimiento).toBeDefined();
      expect(response.fechaInicioEmpleo).toBeDefined();
      expect(repository.save).toBeCalledWith(empleadoDTO);
    });

    it('should throw an InternalServerErrorException if something fails', async () => {
      const empleadoDTO = mockCreateEmpleadoDTO();

      jest
        .spyOn(repository, 'save')
        .mockRejectedValueOnce(new InternalServerErrorException());

      await expect(service.create(empleadoDTO)).rejects.toThrowError(
        InternalServerErrorException,
      );
      expect(repository.save).toBeCalledWith(empleadoDTO);
    });
  });

  describe('search', () => {
    it('Should return an array of Empleados with their total count', async () => {
      const pageNumber = faker.number.int({ min: 1, max: 100 });
      const pageSize = faker.number.int({ min: 1, max: 10 });

      const response = await service.search(pageNumber, pageSize);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      response.data.forEach((empleado: Empleado) => {
        expect(empleado).toBeInstanceOf(Empleado);
        expect(empleado.id).toBeDefined();
        expect(empleado.nombre).toBeDefined();
        expect(empleado.apellido).toBeDefined();
        expect(empleado.fechaNacimiento).toBeDefined();
        expect(empleado.fechaInicioEmpleo).toBeDefined();
      });
      expect(response.count).toBeDefined();
      expect(response.count).toBeGreaterThan(0);
      expect(repository.search).toBeCalledWith(pageNumber, pageSize, undefined);
    });

    it('Should return an array of Empleados applying filters', async () => {
      const pageNumber = faker.number.int({ min: 1, max: 100 });
      const pageSize = faker.number.int({ min: 1, max: 10 });
      const filters = mockEmpleadoFilters();

      jest
        .spyOn(repository, 'search')
        .mockResolvedValueOnce(mockEmpleadoPaginated());

      const response = await service.search(pageNumber, pageSize, filters);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);
      response.data.forEach((empleado: Empleado) => {
        expect(empleado).toBeInstanceOf(Empleado);
        expect(empleado.id).toBeDefined();
        expect(empleado.nombre).toBeDefined();
        expect(empleado.apellido).toBeDefined();
        expect(empleado.fechaNacimiento).toBeDefined();
        expect(empleado.fechaInicioEmpleo).toBeDefined();
      });
      expect(response.count).toBeDefined();
      expect(response.count).toBeGreaterThan(0);
      expect(repository.search).toBeCalledWith(pageNumber, pageSize, filters);
    });

    it('Should return an empty array without applying filters', async () => {
      const pageNumber = faker.number.int({ min: 1, max: 100 });
      const pageSize = faker.number.int({ min: 1, max: 10 });

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

    it('Should return an empty array applying filters', async () => {
      const pageNumber = faker.number.int({ min: 1, max: 100 });
      const pageSize = faker.number.int({ min: 1, max: 10 });
      const filters = mockEmpleadoFilters();

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
});
