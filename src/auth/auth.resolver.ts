import { GqlAccessTokenAuthGuard } from 'src/auth/guards/accessToken.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/user/user.decorator';
import { AuthService } from './auth.service';
import { UserRes } from 'src/model/user.model';
import { CreateUserArgs } from 'src/dto/user.input';
import { LoginArgs } from 'src/dto/auth.args';

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
  async refreshToken(@CurrentUser() user) {
    const userId = user['sub'];
    const refreshToken = user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
