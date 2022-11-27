import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import Constants from './constants'
import { GqlAccessTokenStrategy } from './strategies/accessToken';
import { GqlRefreshTokenStrategy } from './strategies/refreshToken';

@Module({
  providers: [AuthService, AuthResolver, GqlAccessTokenStrategy, GqlRefreshTokenStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: Constants.secret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
})
export class AuthModule {}
