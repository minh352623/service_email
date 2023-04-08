import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubsciberModule } from './subsciber/subsciber.module';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      // useNewUrlParser: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        // transport: config.get('MAIL_TRANSPORT'),
        transport: {
          host: process.env.MAIL_HOST,
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
        },

        defaults: {
          from: `"No Reply" <${process.env.MAIL_FROM}>`,
        },
        template: {
          dir: join(__dirname, 'src/templates/email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    SubsciberModule,

    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
