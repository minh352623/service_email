import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber } from './subscriber.schema';

@Injectable()
export class SubsciberRepository {
  constructor(
    @InjectModel('Subscriber')
    private readonly subscribeModel: Model<Subscriber>,
  ) {}

  async create(doc: any): Promise<any> {
    const createdEntity = new this.subscribeModel(doc);
    return await createdEntity.save();
  }

  async getAll(): Promise<any> {
    return await this.subscribeModel.find();
  }
}
