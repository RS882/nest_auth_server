import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { env } from 'process';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = env.PORT || 4050;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);

  console.log(`Example app listening on port ${PORT}`);
}
bootstrap();
