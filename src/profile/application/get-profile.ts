import type { Profile } from '../domain/profile';

export abstract class ProfileRepository {
  abstract get(): Promise<Profile>;
}

export class GetProfile {
  constructor(private readonly profiles: ProfileRepository) {}

  execute(): Promise<Profile> {
    return this.profiles.get();
  }
}
