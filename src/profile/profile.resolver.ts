import { Query, Resolver } from '@nestjs/graphql';
import { GetProfile } from './application/get-profile';

@Resolver()
export class ProfileResolver {
  constructor(private readonly getProfile: GetProfile) {}

  @Query('profile')
  profile() {
    return this.getProfile.execute();
  }
}
