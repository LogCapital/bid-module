import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenTelemetryNodeSDK } from 'src/tracing';
import { ConfigService, ConfigType } from '@nestjs/config';
import { appConfig, natsConfig } from 'src/config/config';
import { Logger } from '@nestjs/common';
import { NatsOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  OpenTelemetryNodeSDK.start();

  const app = await NestFactory.create(AppModule);

  const logger = new Logger();

  const configService = app.get(ConfigService);
  const configApp: ConfigType<typeof appConfig> = configService.get('app');
  const configNats: ConfigType<typeof natsConfig> = configService.get('nats');

  app.connectMicroservice<NatsOptions>({
    transport: Transport.NATS,
    options: {
      servers: [`nats://${configNats.host}:${configNats.port}`]
    }
  });

  await app.startAllMicroservices();
  await app.listen(configApp.port, () => {
    logger.log(`App is listening on ${configApp.port}`);
  });
}
bootstrap();
