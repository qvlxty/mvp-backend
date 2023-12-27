import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    type: 'string',
    example: 'John',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    type: 'string',
    example: 'example@email.com',
  })
  @IsString()
  @IsEmail()
  email!: string;
}
