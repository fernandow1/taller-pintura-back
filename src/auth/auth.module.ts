import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsuariosModule } from '@usuarios-module/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtEstrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '@usuarios-module/models/entities/usuario.entity';

@Module({
  imports: [
    UsuariosModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET_KEY,
          signOptions: {
            expiresIn: process.env.TOKEN_EXPIRATION,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtEstrategy],
})
export class AuthModule {}
