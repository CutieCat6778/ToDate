import { FindUserDto, UpdateUserDto } from './../dto/user.dto';
import {
  UserInterface,
  ResponseInterface,
  SensoredResponseInterface,
  SensoredUserInterface,
} from './../types/user';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<UserInterface>,
  ) {}

  async findUser(findUserDto: FindUserDto): Promise<SensoredResponseInterface> {
    const doc: any = await this.userModel.findOne({
      username: findUserDto.username,
    });

    const user = doc._doc;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, password, salt, refreshToken, __v, ...sensoredUser } = user;

    const res: SensoredUserInterface = sensoredUser;

    return user
      ? {
          success: true,
          status: 200,
          name: 'Found a user!',
          user: res,
          isLoggedIn: false,
        }
      : {
          success: false,
          status: 404,
          name: 'User not found!',
          isLoggedIn: false,
        };
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<ResponseInterface> {
    try {
      const user = await this.findUser({ username: updateUserDto.query });
      if (!user.success) {
        return {
          success: false,
          status: 500,
          name: 'User not found!',
          isLoggedIn: true,
        };
      } else if (user) {
        await this.userModel.updateOne(
          { username: updateUserDto.query },
          updateUserDto,
        );

        return {
          success: true,
          status: 200,
          name: 'Updated user successfully',
          isLoggedIn: true,
        };
      }
    } catch (e) {
      return {
        success: false,
        status: 500,
        name: 'Internal Server Error',
        isLoggedIn: true,
      };
    }
  }
}
