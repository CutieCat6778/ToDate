import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  bio: string;
}

export class FindUserDto {
  @ApiProperty()
  username: string;
}

export class UpdateUserDto {
  @ApiProperty()
  query: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  bio: string;
}
