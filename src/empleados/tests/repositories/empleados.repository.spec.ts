import { Repository } from 'typeorm';
import { Empleado } from '@main-module/empleados/models/entities/empleado.entity';
import { EmpleadoRepository } from '@main-module/empleados/repositories/empleados.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockEmpleado,
  mockEmpleadoInternalRepository,
} from '../mocks/empleado.mock';
import { InternalServerErrorException } from '@nestjs/common';

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
});
