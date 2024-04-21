import { mockCreateEmpleadoDTO } from '@empleados-module/tests/mocks/empleado.mock';
import { faker } from '@faker-js/faker';
import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from '@usuarios-module/controllers/usuarios.controller';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { UsuariosService } from '@usuarios-module/services/usuarios.service';
import {
  mockCreateUsuarioDTO,
  mockUpdateUsuarioDTO,
  mockUsuarioService,
} from '@usuarios-module/tests/mocks/usuario.mock';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        UsuariosService,
        { provide: UsuariosService, useValue: mockUsuarioService },
      ],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an User and return it', async () => {
      const usuarioCreateDTO = mockCreateUsuarioDTO();

      const response = await controller.create(usuarioCreateDTO);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.id).toBeDefined();
      expect(response.usuario).toBeDefined();
      expect(response.usuario).toEqual(usuarioCreateDTO.usuario);
      expect(response.idEmpleado).toBeDefined();
      expect(response.idEmpleado).toEqual(usuarioCreateDTO.idEmpleado);
      expect(service.create).toBeCalledWith(usuarioCreateDTO);
    });

    it('should throw an InternalServerErrorException if something goes wrong', async () => {
      const usuarioCreateDTO = mockCreateUsuarioDTO();

      jest
        .spyOn(service, 'create')
        .mockRejectedValueOnce(new InternalServerErrorException('Test Error'));

      await expect(controller.create(usuarioCreateDTO)).rejects.toThrowError(
        new InternalServerErrorException('Test Error'),
      );
      expect(service.create).toBeCalledWith(usuarioCreateDTO);
    });
  });

  describe('update', () => {
    it('should return an Usuario entity with their attrbutes updated', async () => {
      const id = faker.number.int();
      const usuarioUpdateDTO = mockUpdateUsuarioDTO();

      const response = await controller.update(id, usuarioUpdateDTO);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.id).toBeDefined();
      expect(response.id).toEqual(id);
      expect(response.usuario).toBeDefined();
      expect(response.usuario).toEqual(usuarioUpdateDTO.usuario);
      expect(response.idEmpleado).toBeDefined();
      expect(response.idEmpleado).toEqual(usuarioUpdateDTO.idEmpleado);
    });

    it('should throw an InternalServerErrorException if something goes wrong', async () => {
      const id = faker.number.int();
      const usuarioUpdateDTO = mockUpdateUsuarioDTO();

      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new InternalServerErrorException('Test Error'));

      await expect(
        controller.update(id, usuarioUpdateDTO),
      ).rejects.toThrowError(new InternalServerErrorException('Test Error'));
      expect(service.update).toBeCalledWith(id, usuarioUpdateDTO);
    });
  });
});
