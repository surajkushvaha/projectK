import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_CONSTANTS } from './constants/app.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  await app.listen(APP_CONSTANTS.PORT, APP_CONSTANTS.HOSTNAME);
}
bootstrap();
