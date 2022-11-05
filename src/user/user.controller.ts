import { UpdateUserDto } from './../dto/user.dto';
import { ResponseInterface } from './../types/user';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, FindUserDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('findUser')
  async findUser(@Body() findUserDto: FindUserDto): Promise<ResponseInterface> {
    return this.service.findUser(findUserDto);
  }

  @Get('createUser')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseInterface> {
    return this.service.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('updateUser')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseInterface> {
    return this.service.updateUser(updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('@me')
  profile(@Request() req) {
    return req.user;
  }

  @Get('*')
  async notFound() {
    return new NotFoundException();
  }
}
