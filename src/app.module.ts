import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { GetProfile, ProfileRepository } from './profile/application/get-profile';
import { PrismaProfiles } from './profile/infrastructure/prisma-profiles';
import { ProfileResolver } from './profile/profile.resolver';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    typePaths: ['schema.graphql'],
    playground: false,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  })],
  providers: [
    ProfileResolver,
    { provide: ProfileRepository, useFactory: () => new PrismaProfiles(new PrismaClient()) },
    {
      provide: GetProfile, inject: [ProfileRepository],
      useFactory: (profiles: ProfileRepository) => new GetProfile(profiles),
    },
  ],
})
export class AppModule {}
