import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetDateArgs, GetDatesArgs } from 'src/dto/date.args';
import { DateService } from './date.service';
import { UseGuards } from "@nestjs/common";
import { GqlAccessTokenAuthGuard } from 'src/auth/guards/accessToken.guard';
import { Date, User } from 'src/model/user.model';
import { CreateDateInput, RemoveDateInput, UpdateDateInput } from 'src/dto/date.input';
import { CurrentUser } from 'src/user/user.decorator';
import { Throttle } from '@nestjs/throttler';
import { GqlThrottlerGuard } from 'src/auth/guards/throttler.guard';

@Resolver()
export class DateResolver {

  constructor(private service: DateService) {}

  @UseGuards(GqlAccessTokenAuthGuard, GqlThrottlerGuard)
  @Throttle(5, 60)
  @Query(returns => [Date])
  async getDates(@Args() args: GetDatesArgs) {
    return this.service.getDates(args);
  }

  @UseGuards(GqlAccessTokenAuthGuard, GqlThrottlerGuard)
  @Throttle(5, 60)
  @Query(returns => Date)
  async getDateById(@Args() args: GetDateArgs) {
    return this.service.getDateById(args);
  }

  @UseGuards(GqlAccessTokenAuthGuard, GqlThrottlerGuard)
  @Throttle(1, 60)
  @Mutation(returns => Date)
  async updateDate(@Args('updateDate') args: UpdateDateInput) {
    return this.service.updateDate(args);
  }

  @UseGuards(GqlAccessTokenAuthGuard, GqlThrottlerGuard)
  @Throttle(1, 60)
  @Mutation(returns => Boolean)
  async removeDate(@Args('removeDate') args: RemoveDateInput) {
    return this.service.removeDate(args);
  }

  @UseGuards(GqlAccessTokenAuthGuard, GqlThrottlerGuard)
  @Throttle(3, 60)
  @Mutation(returns => Date)
  async createDate(@Args('createDate') args: CreateDateInput, @CurrentUser() user: any) {
    return this.service.createDate(args, user.sub);
  }

}
