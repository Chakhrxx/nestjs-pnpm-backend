import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigReader } from 'neconfig';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigReader);
  const port = config.getIntOrThrow('PORT');

  await app.listen(port || 5001);
  Logger.log(`Listening on http://localhost:${port}`);
}

bootstrap();
