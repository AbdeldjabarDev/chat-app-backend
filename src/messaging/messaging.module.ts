import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingController } from './messaging.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Channel} from './entities/channel.entity';
import { Message } from './entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EventsGateway } from './gateway.service';

@Module({
   imports: [TypeOrmModule.forFeature([Message,Channel,User])],
  controllers: [MessagingController],
  providers: [MessagingService,JwtService,EventsGateway],

})
export class MessagingModule {}
