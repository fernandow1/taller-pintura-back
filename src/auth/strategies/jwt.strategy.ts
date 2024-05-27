import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAppPayload } from '../models/interfaces/app-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtEstrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: IAppPayload): Promise<IAppPayload> {
    if (payload.origen === process.env.ORIGIN_APP) {
      return payload;
    }

    throw new UnauthorizedException(
      'No tienes permiso para acceder al sistema.',
    );
  }
}
