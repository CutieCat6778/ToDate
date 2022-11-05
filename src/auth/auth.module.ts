import { usersProviders } from './../user/user.provider';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({}), DatabaseModule],
  providers: [
    AuthService,
    AccessTokenStrategy,
    LocalStrategy,
    RefreshTokenStrategy,
    ...usersProviders,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
