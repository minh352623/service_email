import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { SubsciberService } from './subsciber.service';
import {
  ClientProxy,
  EventPattern,
  GrpcMethod,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { CreateSubscriberDto } from './subscriber.dto';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
@Controller('subsciber')
export class SubsciberController {
  constructor(
    private readonly subscribeService: SubsciberService,

    private readonly rabbitMqService: RabbitmqService,
  ) {}
  @MessagePattern('queue-b')
  async getAllSubscriber(@Payload() createSubscriber: any) {
    console.log(createSubscriber);

    const data = await this.subscribeService.getAll();
    console.log(data);
    return data;
  }

  // @MessagePattern('queue-b')
  // async addSubscriber(@Payload() createSubscriber: CreateSubscriberDto) {
  //   console.log(1);

  //   const data = await this.subscribeService.addSubscriber(createSubscriber);
  //   console.log(data);

  //   if (data) {
  //     // await channel.assertQueue(queueName);
  //     return this.rabbitMqService.sendMessageToServiceA('alo');
  //   }
  // }

  @MessagePattern({ cmd: 'get-all-subscriber' })
  async getAllSubscribera() {
    console.log('ádasd');

    return await this.subscribeService.getAll();
  }

  @EventPattern({ cmd: 'queue-b' })
  async eventAddSubscriber(createSubscriberDto: CreateSubscriberDto) {
    console.log(1);

    const data = await this.subscribeService.addSubscriber(createSubscriberDto);
    console.log(data);

    return 1;
  }

  @Get()
  async getSubscribers() {
    // return this.subscriberService.send(
    //   {
    //     cmd: 'get-all-subscriber',
    //   },
    //   {},
    // );
    console.log('asdasdasd');

    return this.rabbitMqService.sendMessageToServiceA('alo');
  }

  // @GrpcMethod('SubscriberService', 'AddSubscriber')
  // async addSubscriberGrpcMethod(createSubscriberDto: CreateSubscriberDto) {
  //   return this.subscribeService.addSubscriber(createSubscriberDto);
  // }

  // @GrpcMethod('SubscriberService', 'GetAllSubscribers')
  // async getAllSubscribersGrpcMethod() {
  //   return {
  //     data: await this.subscribeService.getAll(),
  //   };
  // }
}
