import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubsciberController } from './subsciber.controller';
import { SubsciberService } from './subsciber.service';
import { SubsciberRepository } from './subscriber.repository';
import { Subscriber, SubscriberSchema } from './subscriber.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscriber.name, schema: SubscriberSchema },
    ]),
  ],
  controllers: [SubsciberController],
  providers: [SubsciberService, SubsciberRepository],
})
export class SubsciberModule {}
