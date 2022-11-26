import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { usersProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserResolver, ...usersProviders],
  exports: [UserService]
})
export class UserModule {}
