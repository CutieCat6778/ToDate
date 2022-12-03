import { GqlAccessTokenAuthGuard } from 'src/auth/guards/accessToken.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/user/user.decorator';
import { AuthService } from './auth.service';
import { Tokens, UserRes } from 'src/model/user.model';
import { CreateUserArgs } from 'src/dto/user.input';
import { LoginArgs } from 'src/dto/auth.args';
import { GqlRefreshTokenAuthGuard } from './guards/refreshToken.guard';
import { Throttle } from '@nestjs/throttler';
import { GqlThrottlerGuard } from './guards/throttler.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Throttle(3, 30)
  @UseGuards(GqlThrottlerGuard)
  @Query((returns) => UserRes)
  async login(@Args() args: LoginArgs) {
    return this.authService.login(args);
  }
  
  @UseGuards(GqlAccessTokenAuthGuard, GqlThrottlerGuard)
  @Throttle(3, 30)
  @Query((returns) => Boolean)
  @UseGuards(GqlAccessTokenAuthGuard)
  async logout(@CurrentUser() user) {
    return this.authService.logout(user['sub']);
  }
  
  @UseGuards(GqlAccessTokenAuthGuard, GqlThrottlerGuard)
  @Throttle(1, 60)
  @Mutation((returns) => UserRes)
  async signup(@Args('createUser') createUser: CreateUserArgs) {
    return this.authService.signUp(createUser);
  }
  
  @UseGuards(GqlThrottlerGuard, GqlRefreshTokenAuthGuard)
  @Throttle(1, 10)
  @Query((returns) => Tokens)
  @UseGuards(GqlRefreshTokenAuthGuard)
  async refreshToken(@CurrentUser() user) {
    const userId = user['sub'];
    const refreshToken = user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}