import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadosController } from '@empleados-module/controllers/empleados.controller';
import { EmpleadosService } from '@empleados-module/services/empleados.service';
import {
  mockCreateEmpleadoDTO,
  mockEmpleadoService,
} from '@empleados-module/tests/mocks/empleado.mock';
import { Empleado } from '@empleados-module/models/entities/empleado.entity';
import { InternalServerErrorException } from '@nestjs/common';

describe('EmpleadosController', () => {
  let controller: EmpleadosController;
  let service: EmpleadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpleadosController],
      providers: [
        EmpleadosService,
        { provide: EmpleadosService, useValue: mockEmpleadoService },
      ],
    }).compile();

    controller = module.get<EmpleadosController>(EmpleadosController);
    service = module.get<EmpleadosService>(EmpleadosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('save', () => {
    it('should return an Emplyee entity and call the service', async () => {
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
      expect(service.create).toBeCalledWith(empleadoDTO);
    });

    it('should throw an InternalServerErrorException if something fails', async () => {
      const empleadoDTO = mockCreateEmpleadoDTO();

      jest
        .spyOn(service, 'create')
        .mockRejectedValueOnce(new InternalServerErrorException());

      await expect(controller.create(empleadoDTO)).rejects.toThrowError(
        InternalServerErrorException,
      );
      expect(service.create).toBeCalledWith(empleadoDTO);
    });
  });
});
