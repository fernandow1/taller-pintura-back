import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRepository } from '@usuarios-module/repositories/usuarios.repository';
import { UsuariosService } from '@usuarios-module/services/usuarios.service';
import { mockUsuarioRepository } from '@usuarios-module/tests/mocks/usuario.mock';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let repository: UsuarioRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        { provide: UsuarioRepository, useValue: mockUsuarioRepository },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    repository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
