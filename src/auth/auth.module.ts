import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from '../config/configuration';
import { JwtStrategy } from './jwt.strategy';
import { UserEntity } from 'src/modules/user/user.entity';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register(jwtOptions),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
