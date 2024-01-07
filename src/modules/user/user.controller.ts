import { Body, Controller, Delete, Param, Put, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async create(@Body() user: CreateUserDto) {
    const userData = await this.userService.createAccount(
      user.email,
      user.password,
    );
    return userData;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UpdateProfileDto) {
    this.userService.updateUser(id, user);
    return `User ${id} updated`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.userService.deleteUser(id);
    return `User ${id} deleted`;
  }
}
