import { GqlAccessTokenAuthGuard } from 'src/auth/guards/accessToken.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/user/user.decorator';
import { AuthService } from './auth.service';
import { UserRes } from 'src/model/user.model';
import { CreateUserArgs } from 'src/dto/user.input';
import { LoginArgs } from 'src/dto/auth.args';
import { GqlRefreshTokenAuthGuard } from './guards/refreshToken.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((returns) => UserRes)
  async login(@Args() args: LoginArgs) {
    return this.authService.login(args);
  }

  @Query((returns) => Boolean)
  @UseGuards(GqlAccessTokenAuthGuard)
  async logout(@CurrentUser() user) {
    return this.authService.logout(user['sub']);
  }

  @Mutation((returns) => UserRes)
  async signup(@Args('createUser') createUser: CreateUserArgs) {
    return this.authService.signUp(createUser);
  }

  @Query((returns) => UserRes)
  @UseGuards(GqlRefreshTokenAuthGuard)
  async refreshToken(@CurrentUser() user) {
    console.log(user);
    const userId = user['sub'];
    const refreshToken = user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
