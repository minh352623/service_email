import { Injectable } from '@nestjs/common';
import { SubscriberDto } from './subscriber.dto';
import { SubsciberRepository } from './subscriber.repository';

@Injectable()
export class SubsciberService {
  constructor(private readonly subscribeRepository: SubsciberRepository) {}

  async addSubscriber(createSubscriber: SubscriberDto) {
    return await this.subscribeRepository.create(createSubscriber);
  }

  async getAll() {
    return await this.subscribeRepository.getAll();
  }
}
