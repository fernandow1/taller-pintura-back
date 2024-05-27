import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDTO } from '@auth-module/models/dtos/login.dto';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { UsuariosService } from '@usuarios-module/services/usuarios.service';
import { compare } from 'bcrypt';
import { IAppPayload } from '@auth-module/models/interfaces/app-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { IAccessToken } from '@auth-module/models/interfaces/access-token.interface';
import { InvalidCredentialsException } from '@auth-module/exceptions/invalid-credentials.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: LoginDTO): Promise<IAccessToken> {
    const user = await this.validateCredentials(credentials);
    const payload: IAppPayload = {
      id: user.id,
      nombreApellido: `${user.empleado.nombre} ${user.empleado.apellido}`,
      email: user.empleado.email,
      usuario: credentials.usuario,
      origen: process.env.ORIGIN_APP,
    };

    return this.signToken(payload);
  }

  private async validateCredentials(credentials: LoginDTO): Promise<Usuario> {
    try {
      const user = await this.usuarioService.findByUsuario(credentials.usuario);

      const validPassword = await compare(credentials.password, user.password);

      if (validPassword) {
        return user;
      }

      throw new Error();
    } catch (error) {
      throw new InvalidCredentialsException(error);
    }
  }

  private async signToken(payload: IAppPayload): Promise<IAccessToken> {
    const signedToken: IAccessToken = {
      token: this.jwtService.sign(payload, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }),
    };
    return signedToken;
  }
}