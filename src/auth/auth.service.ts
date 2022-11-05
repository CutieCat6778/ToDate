import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/user.dto';
import { ResponseInterface, UserInterface } from '../types/user';
import {
  HashPassword,
  HashRefreshToken,
  ValidatePassword,
} from '../utils/user';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<UserInterface>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userModel.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await ValidatePassword(
      user.refreshToken,
      user.salt,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken, user.salt);
    return tokens;
  }

  async signUp(createUserDto: CreateUserDto) {
    try {
      const userExist = await this.userModel.findOne({
        username: createUserDto.username,
      });

      if (userExist) {
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

      const tokens = await this.getTokens(
        createdUser._id,
        createdUser.username,
      );

      console.log(tokens);

      await this.updateRefreshToken(
        createdUser._id,
        tokens.refreshToken,
        createdUser.salt,
      );

      const res: ResponseInterface = {
        success: true,
        status: 200,
        name: 'Successfully created a new user!',
        user: createdUser,
        token: tokens,
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

  async logout(userId) {
    return this.userModel.updateOne({ _id: userId }, { refreshToken: null });
  }

  async updateRefreshToken(userId: string, refreshToken: string, salt: string) {
    const hashedRefreshToken = HashRefreshToken(refreshToken, salt);
    return this.userModel.updateOne(
      { _id: userId },
      {
        refreshToken: hashedRefreshToken,
      },
    );
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username: username });

    if (user && ValidatePassword(password, user.salt, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(res): Promise<ResponseInterface> {
    const user: UserInterface = res._doc;
    const tokens = await this.getTokens(user._id, user.username);
    await this.updateRefreshToken(user._id, tokens.refreshToken, user.salt);
    return {
      success: true,
      status: 200,
      name: 'Successfully loged in!',
      user: user,
      token: tokens,
    };
  }
}
