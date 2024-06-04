import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@auth-module/services/auth.service';
import { mockEnvironmentVariables } from '@shared-module/tests/mocks/enviroment-variables.mock';
import { UsuariosService } from '@usuarios-module/services/usuarios.service';
import {
  mockUsuario,
  mockUsuarioService,
} from '@usuarios-module/tests/mocks/usuario.mock';
import { mockJWTService } from '@auth-module/tests/mocks/jwt.mock';
import { mockLoginDTO } from '@auth-module/tests/mocks/auth.mock';
import { hash } from 'bcrypt';
import { InvalidCredentialsException } from '@auth-module/exceptions/invalid-credentials.exception';

describe('AuthService', () => {
  let service: AuthService;
  let usuarioService: UsuariosService;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockEnvironmentVariables();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsuariosService, useValue: mockUsuarioService },
        { provide: JwtService, useValue: mockJWTService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usuarioService = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usuarioService).toBeDefined();
  });

  describe('login', () => {
    it('should return an IAccessToken if the credentials are ok', async () => {
      const dto = mockLoginDTO();
      const expectedUser = mockUsuario();

      expectedUser.usuario = dto.usuario;
      expectedUser.password = await hash(dto.password, 10);

      jest
        .spyOn(usuarioService, 'findByUsuario')
        .mockResolvedValueOnce(expectedUser);

      const response = await service.login(dto);

      expect(response).toBeDefined();
      expect(response.token).toBeDefined();
      expect(typeof response.token).toEqual('string');
    });

    it('should throw an InvalidCredentialsException if the credentials are invalids', async () => {
      const dto = mockLoginDTO();
      const expectedUser = mockUsuario();

      expectedUser.usuario = dto.usuario;
      expectedUser.password = await hash(dto.password + 'fer123', 10);

      jest
        .spyOn(usuarioService, 'findByUsuario')
        .mockResolvedValueOnce(expectedUser);

      await expect(service.login(dto)).rejects.toThrowError(
        InvalidCredentialsException,
      );
    });
  });
});
