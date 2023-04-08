import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClientProxy,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import 'dotenv/config';
import { join } from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // connect micro

  //TCP
  // await app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: {
  //     port: 4000,
  //   },
  // });

  //End TCP

  //RABBITMQ
  // await app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [
  //       `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
  //     ],
  //     queue: process.env.RABBITMQ_QUEUE_NAME,
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
        ],
        queue: process.env.RABBITMQ_QUEUE_NAME,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();

  //END RABBITMQ

  //GRPC

  // await app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'subscribers',
  //     protoPath: join(process.cwd(), 'src/subscriber/subscribers.proto'),
  //     url: process.env.GRPC_CONNECTION_URL,
  //   },
  // });
  //end GRPC
  // await app.startAllMicroservices();
  // await app.listen(4000);
}
bootstrap();
