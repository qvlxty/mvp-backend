import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtPayload } from './dto/jwt';
import { envFile } from 'src/config/configuration';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: envFile.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.email);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
