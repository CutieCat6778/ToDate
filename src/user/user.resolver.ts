import { CreateUserArgs, UpdateUserArgs } from '../dto/user.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, SensoredUser } from 'src/model/user.model';
import { GetUserIdArgs, GetUserNameArgs } from 'src/dto/user.args';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAccessTokenAuthGuard } from 'src/auth/guards/accessToken.guard';
import { CurrentUser } from './user.decorator';
import { Throttle } from '@nestjs/throttler';
import { GqlThrottlerGuard } from 'src/auth/guards/throttler.guard';

@Resolver((of) => User)
export class UserResolver {
  constructor(private service: UserService) {}

  @UseGuards(GqlAccessTokenAuthGuard, GqlThrottlerGuard)
  @Throttle(5, 60)
  @Query((returns) => SensoredUser)
  async getUserById(@Args() args: GetUserIdArgs) {
    const user = await this.service.getUserById(args);

    if (!user) {
      throw new NotFoundException();
    }

    const sensoreUser = {
      username: user.username,
      email: user.email,
      biography: user.biography || null,
      avatar: user.avatar || null,
      dates: user.dates || null,
    };

    return sensoreUser;
  }

  @UseGuards(GqlAccessTokenAuthGuard, GqlThrottlerGuard)
  @Throttle(5, 60)
  @Query((returns) => SensoredUser)
  async getUserByName(@Args() args: GetUserNameArgs) {
    const user = await this.service.getUserByName(args);
    if (!user) {
      throw new NotFoundException();
    }
    const sensoreUser = {
      username: user.username,
      email: user.email,
      biography: user.biography || null,
      avatar: user.avatar || null,
      dates: user.dates || null,
    };

    return sensoreUser;
  }

  @UseGuards(GqlAccessTokenAuthGuard, GqlThrottlerGuard)
  @Throttle(1, 60)
  @Mutation((returns) => User)
  async updateUser(@Args('updateUser') args: UpdateUserArgs) {
    const user = await this.service.updateUser(args);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @UseGuards(GqlAccessTokenAuthGuard, GqlThrottlerGuard)
  @Throttle(1, 60)
  @Query((returns) => User)
  async me(@CurrentUser() user: any) {
    const res = await this.service.findOne({ _id: user.sub});
    return res;
  }
}
