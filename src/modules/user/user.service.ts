import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private user: Repository<UserEntity>,
  ) {}

  public findOne(email: string) {
    return this.user.findOne({
      where: {
        email,
      },
    });
  }

  public getProfile(userId: number) {
    return this.user.findOneBy({
      id: userId,
    });
  }

  public async createAccount(email: string, password: string) {
    const passwordHashed = hashSync(password, 10);
    await this.user.save({
      email,
      password: passwordHashed,
    });
  }

  public updateUser(id: string, user: UpdateProfileDto) {
    return this.user.update(id, user);
  }

  public deleteUser(id: string): void {
    this.user.delete(id);
  }
}
