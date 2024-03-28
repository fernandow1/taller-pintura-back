import { Test, TestingModule } from '@nestjs/testing';
import { EmpleadosController } from '@empleados-module/controllers/empleados.controller';
import { EmpleadosService } from '@empleados-module/services/empleados.service';
import {
  mockCreateEmpleadoDTO,
  mockEmpleadoFilters,
  mockEmpleadoPaginated,
  mockEmpleadoService,
} from '@empleados-module/tests/mocks/empleado.mock';
import { Empleado } from '@empleados-module/models/entities/empleado.entity';
import { InternalServerErrorException } from '@nestjs/common';
import {
  mockPaginationDTO,
  mockResultsDTO,
} from '@shared-module/tests/mocks/shared.mock';

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

  describe('search', () => {
    it('Should return an array of Empleados without filters', async () => {
      const response = await controller.search(
        mockPaginationDTO,
        mockResultsDTO,
      );

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
      expect(service.search).toBeCalledWith(
        mockPaginationDTO.pageNumber,
        mockResultsDTO.results,
        undefined,
      );
    });

    it('Should return an array of Empleados applying filters', async () => {
      const filters = mockEmpleadoFilters();

      jest
        .spyOn(service, 'search')
        .mockResolvedValueOnce(mockEmpleadoPaginated());

      const response = await controller.search(
        mockPaginationDTO,
        mockResultsDTO,
        filters,
      );

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
      expect(service.search).toBeCalledWith(
        mockPaginationDTO.pageNumber,
        mockResultsDTO.results,
        filters,
      );
    });

    it('Should return an empty array without filters', async () => {
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

    it('Should return an empty array applying filters', async () => {
      const filters = mockEmpleadoFilters();

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
});
