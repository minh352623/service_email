import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubsciberController } from './subsciber.controller';
import { SubsciberService } from './subsciber.service';
import { SubsciberRepository } from './subscriber.repository';
import { Subscriber, SubscriberSchema } from './subscriber.schema';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscriber.name, schema: SubscriberSchema },
    ]),
    ConfigModule,
  ],
  controllers: [SubsciberController],
  providers: [SubsciberService, SubsciberRepository, RabbitmqService],
})
export class SubsciberModule {}
