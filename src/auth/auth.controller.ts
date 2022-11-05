import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.service.login(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.service.signUp(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Request() req) {
    this.service.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.service.refreshTokens(userId, refreshToken);
  }
}
