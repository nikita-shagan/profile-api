import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.enableCors({ origin: ['https://studio.apollographql.com', 'https://sandbox.embed.apollographql.com'] });
  await app.listen(Number(process.env.PORT ?? 3000), '0.0.0.0');
}

void main();
