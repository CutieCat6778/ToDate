import { ConfigModule } from '@nestjs/config';
import { DateModule } from './../date/date.module';
import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiResolver } from './api.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DateModule, UserModule, ConfigModule],
  providers: [ApiService, ApiResolver],
})
export class ApiModule {}
