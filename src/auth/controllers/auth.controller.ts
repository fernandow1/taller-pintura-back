import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../models/dtos/login.dto';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';
import { AuthService } from '../services/auth.service';
import { IAccessToken } from '../models/interfaces/access-token.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginDTO): Promise<IAccessToken> {
    return this.authService.login(credentials);
  }
}
