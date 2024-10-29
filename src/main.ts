import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config/env';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: envs.HOST_REDIS,
        port: Number(envs.PORT_REDIS),
        password: envs.PASSWORD_REDIS,
        tls: {
          rejectUnauthorized: false,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
