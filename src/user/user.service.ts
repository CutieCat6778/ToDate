import { CreateUserArgs, UpdateUserArgs } from '../dto/user.input';
import { GetUserNameArgs } from '../dto/user.args';
import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/definitions/graphql.def';
import { Model } from 'mongoose';
import { GetUserIdArgs } from 'src/dto/user.args';
import { HashPassword } from 'src/common/utils/hash.utils';
import { Document } from 'mongoose'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User & Document>,
  ) {}

  async getUserById(args: GetUserIdArgs) {
    return this.userModel.findOne({ _id: args._id });
  }

  async getUserByName(args: GetUserNameArgs) {
    return this.userModel.findOne({ _id: args.username });
  }

  async updateUser(args: UpdateUserArgs) {
    const { query, ...data } = args;

    const user = await this.userModel.findOne({ username: query });

    if (!user) return null;

    return this.userModel.updateOne({ username: query }, { ...data });
  }

  async createUser(args: CreateUserArgs) {
    const userExist = await this.userModel.findOne({ username: args.username });

    if (userExist) return null;

    const { salt, hash } = HashPassword(args.password);

    const data = {
      ...args,
      password: hash,
      salt: salt,
    };

    try {
      const user = new this.userModel(data);

      await user.save();

      return user;
    } catch (e) {
      if (e) throw e;
    }
  }
}
