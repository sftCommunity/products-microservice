import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { envs } from './config/envs';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: [envs.natsServers],
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();
  logger.log(`Products microservice running on port ${envs.port}`);
}

bootstrap();
