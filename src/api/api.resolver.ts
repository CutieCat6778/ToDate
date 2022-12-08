import { Args, Query, Resolver } from '@nestjs/graphql';
import { LocationArgs } from 'src/dto/api.args';
import { Location } from 'src/model/api.model';
import { ApiService } from './api.service';

@Resolver()
export class ApiResolver {
  constructor(private service: ApiService) {}

  @Query(returns => Location)
  getLocationData(@Args() args: LocationArgs) {
    return this.service.getLocation(args.lat, args.long);
  }
}
