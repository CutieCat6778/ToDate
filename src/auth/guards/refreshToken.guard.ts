import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  handleRequest(...args) {
    console.log(args);
    return super.handleRequest(args[0], args[1], args[2], args[3]);
  }
}
