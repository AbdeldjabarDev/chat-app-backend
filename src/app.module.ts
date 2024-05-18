import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messaging/entities/message.entity';
import { User } from './users/entities/user.entity';
import { log } from 'console';
import { UsersModule } from './users/users.module';
import { MessagingService } from './messaging/messaging.service';
import { MessagingModule } from './messaging/messaging.module';
import { FilesService } from './files/local-files.service';
import { FilesModule } from './files/files.module';
import 'dotenv/config';
const POSTGRES_PORT = process.env.POSTGRES_PORT ;
const POSTGRES_HOST = process.env.POSTGRES_HOST ;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ;
const POSTGRES_USER = process.env.POSTGRES_USER ;
const POSTGRES_DB = process.env.POSTGRES_DB ;1
export const JWT_SECRET = process.env.JWT_SECRET;
log(POSTGRES_PORT, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER,POSTGRES_DB);
import globalDataSource from '../db/dataSource';
@Module({
  imports: [
    TypeOrmModule.forRoot(globalDataSource.options),
     UsersModule,
      MessagingModule, 
    FilesModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
