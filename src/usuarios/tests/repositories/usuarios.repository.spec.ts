import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { UsuarioRepository } from '@usuarios-module/repositories/usuarios.repository';
import { Repository } from 'typeorm';
import { mockUsuarioInternalRepository } from '@usuarios-module/tests/mocks/usuario.mock';

describe('UsuarioRepository', () => {
  let repository: UsuarioRepository;
  let internalRepository: Repository<Usuario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioRepository,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockUsuarioInternalRepository,
        },
      ],
    }).compile();

    repository = module.get<UsuarioRepository>(UsuarioRepository);
    internalRepository = module.get<Repository<Usuario>>(
      getRepositoryToken(Usuario),
    );
  });

  it('Sohuld be defined', () => {
    expect(repository).toBeDefined();
    expect(internalRepository).toBeDefined();
  });
});
