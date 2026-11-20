import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
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
    typeDefs: readFileSync(join(__dirname, '../schema.graphql'), 'utf8'),
    playground: false,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  })],
  providers: [
    ProfileResolver,
    {
      provide: ProfileRepository,
      useFactory: () => {
        if (!process.env.VERCEL) return new PrismaProfiles(new PrismaClient());

        const database = '/tmp/profile.db';
        writeFileSync(database, readFileSync(join(__dirname, '../data/profile.db')));
        return new PrismaProfiles(new PrismaClient({ datasourceUrl: `file:${database}` }));
      },
    },
    {
      provide: GetProfile, inject: [ProfileRepository],
      useFactory: (profiles: ProfileRepository) => new GetProfile(profiles),
    },
  ],
})
export class AppModule {}
