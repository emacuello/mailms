import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { envs } from './config/env';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: envs.HOST_REDIS,
      port: Number(envs.PORT_REDIS),
      password: envs.PASSWORD_REDIS,
    },
  });
  await app.listen();
}
bootstrap();
