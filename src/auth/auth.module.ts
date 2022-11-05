import { usersProviders } from './../user/user.provider';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ...usersProviders],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
