import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { CreateChannelDTO } from './dto/create-channel.dto';
import { UserAuthGuard } from '../users/services/auth-guard.service';
import { SendMessageDTO } from './dto/send-message.dto';
import { GetMessagesDTO } from './dto/get-messages.dto';
import { MarkMessageDTO } from './dto/mark-message.dto';
import { JoinChannelDTO } from './dto/join-channel.dto';


@Controller('chat')
@UseGuards(UserAuthGuard)
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {
  
  }

  @Post('/create-channel')
  async createChannel(@Body() createChannelDto: CreateChannelDTO,@Request() request) {
    createChannelDto.userIds.push(request['user'].sub);
    const channel = await this.messagingService.createChannel(request['user'].sub,createChannelDto);
    return channel;

  }
  @Post('/join-channel')
  async joinChannel(@Body() joinChannelDTO: JoinChannelDTO, @Request() request) {
    await this.messagingService.joinChannel(request['user'].sub, joinChannelDTO.channelId);

  }
  // @Post('/leave-channel')
  // async leaveChannel(@Body() createChannelDto: CreateChannelDTO, @Request() request) {

  // }
  @Post('/delete-channel')
  async deleteChannel(@Body() createChannelDto: CreateChannelDTO, @Request() request) {

  }
  @Post('/send-message')
  async sendMessage(@Body() sendMessageDto: SendMessageDTO,@Request() request) {
    const result = await this.messagingService.sendMessage(request['user'].sub,sendMessageDto);
    return result;
  }
  @Post('/get-messages')
  async getMessages(@Body() getMessagesDto: GetMessagesDTO,@Request() request) {
    const result = await this.messagingService.getMessages(request['user'].sub,getMessagesDto);
    return result;
  }
  @Get('/get-channels')
  async getChannels(@Request() request) {
    const channels = await this.messagingService.getChannels(request['user'].sub);
   return channels;
  }
  @Post('/mark-message')
  async markMessage(@Body() markMessageDto: MarkMessageDTO,@Request() request) {
    const result = await this.messagingService.markMessage(request['user'].sub,markMessageDto);
    return result;
  }
  @Get('/get-conversations')
  async getConversations(@Request() request) {
    const conversations = await this.messagingService.getChannels(request['user'].sub);
    return conversations;
  }
  @Get('/get-unread-messages')
  async getUnreadMessages(@Request() request) {
    const result = await this.messagingService.getUnreadMessages(request['user'].sub);
    return result;
  }

}
