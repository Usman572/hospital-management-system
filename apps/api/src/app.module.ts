import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database';
import { configuration, validationSchema } from './config';
import { LoggerModule } from './common/logger';
@Module({
 imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
    validationSchema,
   envFilePath: '.env',
  }),

  DatabaseModule,
  LoggerModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
