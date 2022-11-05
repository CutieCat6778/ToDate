import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserInterface } from '../types/user';
import { ValidatePassword } from '../utils/user';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<UserInterface>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username: username });

    if (user && ValidatePassword(password, user.salt, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { user: user._doc.username, sub: user._doc._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
