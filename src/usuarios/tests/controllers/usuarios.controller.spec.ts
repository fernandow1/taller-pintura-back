import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from '@usuarios-module/controllers/usuarios.controller';
import { UsuariosService } from '@usuarios-module/services/usuarios.service';
import { mockUsuarioService } from '@usuarios-module/tests/mocks/usuario.mock';

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
});
