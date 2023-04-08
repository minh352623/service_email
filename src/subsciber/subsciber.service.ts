import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';

import { CreateSubscriberDto } from './subscriber.dto';
import { SubsciberRepository } from './subscriber.repository';
import { MailerService } from '@nest-modules/mailer';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class SubsciberService {
  constructor(
    private readonly subscribeRepository: SubsciberRepository,
    private mailerService: MailerService,
  ) {}

  async addSubscriber(createSubscriber: CreateSubscriberDto) {
    // throw new HttpException('hehe', HttpStatus.BAD_REQUEST);
    const time1 = new Date();
    const data = await this.mailerService.sendMail({
      to: createSubscriber.email,
      subject: 'Welcome to my website',
      template: './welcome',
      context: {
        name: createSubscriber.name,
      },
    });
    const time2 = new Date();
    console.log('Send Success: ', time2.getTime() - time1.getTime(), 'ms');

    return await this.subscribeRepository.create(createSubscriber);
  }

  async getAll() {
    return await this.subscribeRepository.getAll();
  }
}
