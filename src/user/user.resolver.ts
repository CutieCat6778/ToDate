import {
  CreateUserArgs,
  UpdateUserArgs,
} from '../dto/user.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, SensoredUser } from 'src/model/user.model';
import { GetUserIdArgs, GetUserNameArgs } from 'src/dto/user.args';
import { NotFoundException } from '@nestjs/common';

@Resolver((of) => User)
export class UserResolver {
  constructor(private service: UserService) {}

  @Query((returns) => SensoredUser)
  async getUserById(@Args() args: GetUserIdArgs) {

    return new NotFoundException();

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
    }

    return sensoreUser;
  }

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
    }

    return sensoreUser;
  }

  @Mutation((returns) => User)
  async updateUser(
    @Args('updateUser') args: UpdateUserArgs
  ) {
    const user = await this.service.updateUser(args);

    if(!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Mutation((returns) => User)
  async createUser(
    @Args('createUser') args: CreateUserArgs
  ) {
    console.log(args);

    const user = await this.service.createUser(args)

    if(!user) {
      throw new NotFoundException()
    }

    return user;
  }
}
