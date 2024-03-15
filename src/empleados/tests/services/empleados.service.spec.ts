import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadosService } from '@empleados-module/services/empleados.service';
import { EmpleadoRepository } from '@main-module/empleados/repositories/empleados.repository';
import {
  mockCreateEmpleadoDTO,
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
});
