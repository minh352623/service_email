import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type SubscriberDocument = HydratedDocument<Subscriber>;

@Schema({ timestamps: true })
export class Subscriber extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
// PostSchema.virtual('categories', {
//   ref: 'Category',
//   localField: '_id',
//   foreignField: 'categories',
//   justOne: false, //1-n => false,1-1 true
// });
