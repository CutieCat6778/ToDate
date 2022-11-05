import { CreateUserDto, FindUserDto, UpdateUserDto } from './../dto/user.dto';
import { UserInterface, ResponseInterface } from './../types/user';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { HashPassword } from '../utils/user';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<UserInterface>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseInterface> {
    try {
      const user = await this.userModel.findOne({
        username: createUserDto.username,
      });

      if (user) {
        return {
          success: false,
          status: 500,
          name: 'Username already existed!',
        };
      }

      const { salt, hash } = HashPassword(createUserDto.password);

      const dto = {
        ...createUserDto,
        password: hash,
        salt: salt,
      };

      const createdUser = new this.userModel(dto);

      await createdUser.save();

      const res: ResponseInterface = {
        success: true,
        status: 200,
        name: 'Successfully created a new user!',
        user: createdUser,
      };

      return res;
    } catch (e) {
      console.error(e);
      return {
        success: false,
        status: 500,
        name: 'Internal Service Error',
      };
    }
  }

  async findUser(findUserDto: FindUserDto): Promise<ResponseInterface> {
    const user = await this.userModel.findOne({
      username: findUserDto.username,
    });

    return user
      ? {
          success: true,
          status: 200,
          name: 'Found a user!',
          user,
        }
      : {
          success: false,
          status: 404,
          name: 'User not found!',
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
        };
      }
    } catch (e) {
      return {
        success: false,
        status: 500,
        name: 'Internal Server Error',
      };
    }
  }
}
