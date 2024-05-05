import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '@auth-module/models/dtos/login.dto';
import { AuthService } from '@auth-module/services/auth.service';
import { IAccessToken } from '@auth-module/models/interfaces/access-token.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginDTO): Promise<IAccessToken> {
    return this.authService.login(credentials);
  }
}
