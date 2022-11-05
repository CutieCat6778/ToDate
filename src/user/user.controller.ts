import { UpdateUserDto } from './../dto/user.dto';
import { ResponseInterface, SensoredResponseInterface } from './../types/user';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  UseGuards,
  Request,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get(':username')
  async findUser(
    @Param('username') username: string,
  ): Promise<SensoredResponseInterface> {
    return this.service.findUser({ username });
  }

  @UseGuards(AccessTokenGuard)
  @Patch('updateUser')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseInterface> {
    return this.service.updateUser(updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('@me')
  profile(@Request() req) {
    return req.user;
  }

  @Get('*')
  async notFound() {
    return new NotFoundException();
  }
}
