import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { create } from 'domain';
import { async } from 'rxjs';
import {
  HashPassword,
  HashRefreshToken,
  ValidatePassword,
} from 'src/common/utils/hash.utils';
import { User } from 'src/definitions/graphql.def';
import { LoginArgs } from 'src/dto/auth.args';
import { CreateUserArgs } from 'src/dto/user.input';
import { UserService } from 'src/user/user.service';
import jwtConstants from './constants';
import { UserRegex, EmailRegex, PasswordRegex } from './regex';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
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

  async updateRefreshToken(userId: string, refreshToken: string, salt: string) {
    const hashedRefreshToken = HashRefreshToken(refreshToken, salt);
    return this.userService.updateOne(
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
    const user = await this.userService.findOne({ username });

    if (user && ValidatePassword(password, user.salt, user.password)) {
      const { password, ...res } = user;

      return res;
    }

    return null;
  }

  async login(args: LoginArgs) {

    const { user: user1, password } = this.InfoValidation(args.username, args.password);

    if(!user1) {
      return new Error("user");
    } else if(!password) {
      return new Error("password");
    }

    const res: any = await this.validateUser(args.username, args.password);

    if(!res) {
      return new Error("Wrong login informations!");
    }

    const user = res._doc;
    const tokens = await this.getTokens(user._id, user.username);
    await this.updateRefreshToken(user._id, tokens.refreshToken, user.salt);

    if (!user || !tokens || !tokens.accessToken || !tokens.refreshToken)
      return new InternalServerErrorException();

    return {
      user,
      tokens,
    };
  }

  async logout(userId) {
    await this.userService.updateOne({ _id: userId }, { refreshToken: null });
    return true;
  }

  InfoValidation(username: string, password: string, email?: string) {
    return email ? {
      user: UserRegex.test(username),
      password: PasswordRegex.test(password),
      email: EmailRegex.test(email),
    } : {
      user: UserRegex.test(username),
      password: password == "admin" ? true : PasswordRegex.test(password),
    }
  }

  async signUp(createUser: CreateUserArgs) {
    try {
      const userExist = await this.userService.findOne({
        username: createUser.username,
      });

      if (userExist || userExist?.username) {
        return new Error('User existed!');
      }

      const { user, password, email } = this.InfoValidation(createUser.username, createUser.password, createUser.email);

      if(!user) {
        return new Error("user");
      } else if(!password) {
        return new Error("password");
      } else if(!email) {
        return new Error("email");
      }

      const { salt, hash } = HashPassword(createUser.password);

      const dto = {
        ...createUser,
        password: hash,
        salt: salt,
      };

      const createdUser = await this.userService.createUser(dto);

      const tokens = await this.getTokens(
        createdUser._id,
        createdUser.username,
      );

      await this.updateRefreshToken(
        createdUser._id,
        tokens.refreshToken,
        createdUser.salt,
      );

      return {
        user: createUser,
        tokens,
      };
    } catch (e) {
      throw e;
    }
  }
}
