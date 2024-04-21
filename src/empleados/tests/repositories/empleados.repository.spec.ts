import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { Empleado } from '@main-module/empleados/models/entities/empleado.entity';
import { EmpleadoRepository } from '@main-module/empleados/repositories/empleados.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockEmpleado,
  mockEmpleadoArray,
  mockEmpleadoFilters,
  mockEmpleadoInternalRepository,
} from '../mocks/empleado.mock';
import { InternalServerErrorException } from '@nestjs/common';
import { mockQueryBuilder } from '@shared-module/tests/mocks/typeorm.mock';

describe('EmpleadoRepository', () => {
  let repository: EmpleadoRepository;
  let internalRepository: Repository<Empleado>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpleadoRepository,
        {
          provide: getRepositoryToken(Empleado),
          useValue: mockEmpleadoInternalRepository,
        },
      ],
    }).compile();

    repository = module.get<EmpleadoRepository>(EmpleadoRepository);
    internalRepository = module.get<Repository<Empleado>>(
      getRepositoryToken(Empleado),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(internalRepository).toBeDefined();
  });

  describe('save', () => {
    it('should save an Employee and return an employee entity calling the internal repository', async () => {
      const empleado = mockEmpleado();

      const response = await repository.save(empleado);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Empleado);
      expect(response.id).toBeDefined();
      expect(response.nombre).toBeDefined();
      expect(response.apellido).toBeDefined();
      expect(response.dni).toBeDefined();
      expect(response.email).toBeDefined();
      expect(response.fechaNacimiento).toBeDefined();
      expect(response.fechaInicioEmpleo).toBeDefined();
      expect(internalRepository.save).toBeCalledWith(empleado);
    });

    it('should throw an InternalServerErrorException if something fails', async () => {
      const empleado = mockEmpleado();

      jest
        .spyOn(internalRepository, 'save')
        .mockRejectedValueOnce(new InternalServerErrorException('Test Errror'));

      await expect(repository.save(empleado)).rejects.toThrowError(
        InternalServerErrorException,
      );
      expect(internalRepository.save).toBeCalledWith(empleado);
    });
  });

  describe('search', () => {
    it('Should return an array of Empleados with their total count', async () => {
      const pageNumber = faker.number.int({ min: 1, max: 100 });
      const pageSize = faker.number.int({ min: 1, max: 10 });
      const empleados = mockEmpleadoArray();

      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementationOnce(() => {
          return {
            ...mockQueryBuilder({
              getManyAndCountResponse: [empleados, empleados.length],
            }),
          };
        });

      const response = await repository.search(pageNumber, pageSize);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      response.data.forEach((empleado: Empleado) => {
        expect(empleado).toBeInstanceOf(Empleado);
        expect(empleado.id).toBeDefined();
        expect(empleado.nombre).toBeDefined();
        expect(empleado.apellido).toBeDefined();
        expect(empleado.fechaNacimiento).toBeDefined();
        expect(empleado.fechaInicioEmpleo).toBeDefined();
      });
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeGreaterThan(0);
    });

    it('Should return an empty array if not found registers', async () => {
      const pageNumber = faker.number.int({ min: 1, max: 100 });
      const pageSize = faker.number.int({ min: 1, max: 10 });

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

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      expect(response.data.length).toEqual(0);
      expect(response.count).toEqual(0);
    });

    it('Should return an array of Empleados applying filters', async () => {
      const pageNumber = faker.number.int({ min: 1, max: 100 });
      const pageSize = faker.number.int({ min: 1, max: 10 });
      const filters = mockEmpleadoFilters();
      const empleados = mockEmpleadoArray();

      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementationOnce(() => {
          return {
            ...mockQueryBuilder({
              getManyAndCountResponse: [empleados, empleados.length],
            }),
          };
        });

      const response = await repository.search(pageNumber, pageSize, filters);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.count).toBeDefined();
      response.data.forEach((empleado: Empleado) => {
        expect(empleado).toBeInstanceOf(Empleado);
        expect(empleado.id).toBeDefined();
        expect(empleado.nombre).toBeDefined();
        expect(empleado.apellido).toBeDefined();
        expect(empleado.fechaNacimiento).toBeDefined();
        expect(empleado.fechaInicioEmpleo).toBeDefined();
      });
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.count).toBeGreaterThan(0);
    });

    it('Should return an empty array applying filters', async () => {
      const pageNumber = faker.number.int({ min: 1, max: 100 });
      const pageSize = faker.number.int({ min: 1, max: 10 });
      const filters = mockEmpleadoFilters();

      internalRepository.createQueryBuilder = jest
        .fn()
        .mockImplementationOnce(() => {
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
});
