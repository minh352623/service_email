import { Controller } from '@nestjs/common';
import { SubsciberService } from './subsciber.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubscriberDto } from './subscriber.dto';
@Controller('subsciber')
export class SubsciberController {
  constructor(private readonly subscribeService: SubsciberService) {}

  @MessagePattern({ cmd: 'add-subscriber' })
  async addSubscriber(@Payload() createSubscriber: SubscriberDto) {
    return await this.subscribeService.addSubscriber(createSubscriber);
  }

  @MessagePattern({ cmd: 'get-all-subscriber' })
  async getAllSubscriber() {
    return await this.subscribeService.getAll();
  }
}
