import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from 'src/modules/user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.get(UserService).createAccount('admin@email.com', 'password');
  console.log('User has been created');
}
bootstrap();
