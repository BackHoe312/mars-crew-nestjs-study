import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')!,
    });
  }

  public async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}

export interface JwtPayload {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
}
