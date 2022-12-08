import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { DateService } from './date.service';
import { datesProviders } from './date.providers';
import { DatabaseModule } from 'src/database/database.module';
import { DateResolver } from './date.resolver';

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [DateService, ...datesProviders, DateResolver],
  exports: [DateService],
})
export class DateModule {}
