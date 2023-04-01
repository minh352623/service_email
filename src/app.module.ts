import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubsciberModule } from './subsciber/subsciber.module';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      // useNewUrlParser: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    }),
    SubsciberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
