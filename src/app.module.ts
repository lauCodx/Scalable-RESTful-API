import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      cache:true,
      load:[config]
    }),

    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (config) =>({
        uri:config.get('database.connectionString')
      }),
      inject:[ConfigService]

    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
