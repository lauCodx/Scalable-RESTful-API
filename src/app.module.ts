import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TaskModule } from './task/task.module';

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
    }),

    JwtModule.registerAsync({
      imports:[ConfigModule],
      global:true,
      useFactory: async (config) =>({
        secret:config.get('jwt.secretKey')
      }),
      inject: [ConfigService]
    }),

    AuthModule,

    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
