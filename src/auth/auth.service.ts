import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/modules/user/user.entity';
import { JwtPayload } from './dto/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await compare(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }

  async login(user: LoginDto) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  composeToken(user: Pick<UserEntity, 'id' | 'email'>): string {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };
    return `${this.jwtService.sign(payload)}`;
  }

  async getUserData(userId: number) {
    const user = await this.usersService.getProfile(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
