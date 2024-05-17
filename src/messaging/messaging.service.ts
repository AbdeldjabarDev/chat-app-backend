import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { UpdateMessagingDto } from './dto/update-messaging.dto';
import { CreateChannelDTO } from './dto/create-channel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel, ChannelType } from './entities/channel.entity';
import { ulid } from 'ulid';
import { User } from 'src/users/entities/user.entity';
import { MessageType, SendMessageDTO } from './dto/send-message.dto';
import { Message } from './entities/message.entity';
import { GetMessagesDTO } from './dto/get-messages.dto';
import { MarkMessageDTO, MessageStatus } from './dto/mark-message.dto';
import { log } from 'console';
import { data } from 'autoprefixer';
import { createHash } from 'crypto';
import { EventsGateway } from './gateway.service';
import * as crypto from 'crypto';

function sha256ToUlid(sha256Hex: string): string {
    // Convert SHA256 hex string to buffer
    const sha256Buffer = Buffer.from(sha256Hex, 'hex');

    // Convert SHA256 buffer to Base32
    const base32String = sha256Buffer.toString('base64')
                                    .replace(/=/g, '') // Remove padding
                                    .replace(/\+/g, '-') // Replace '+' with '-'
                                    .replace(/\//g, '_'); // Replace '/' with '_'

    // Truncate to first 16 characters
    const ulidLike = base32String.substring(0, 16);

    // Add timestamp component
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const ulidLikeWithTime = `${ulidLike}${timestamp}`;

    return ulidLikeWithTime;
}
@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository : Repository<Channel>,
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,

    @InjectRepository(Message)
    private readonly messageRepository : Repository<Message>,

    private readonly realtime : EventsGateway

    ){}
  async createChannel(ownerId : string,params : CreateChannelDTO){
    const users = [];
    for(const id of params.userIds){
      const user = await this.userRepository.findOne({
        where : {
          id : id
        }
      });
      if(!user)
      throw new BadRequestException('User with id : ' + id + 'Does not exist')
      users.push(user);

    }
    const owner = await this.userRepository.findOne({
      where : {
        id : ownerId
      }
    }
    );
    // if(!owner)
    // throw new BadRequestException('owner does not exist')
    const channelHash = createHash('sha256').update(params.userIds.concat(ownerId).sort((a,b) => a.localeCompare(b)).join(',')).digest('hex');
     const prevChannel = await this.channelRepository.findOne({
      where : {
        hash : channelHash
        // owner : owner
      }
    });
   
    if(prevChannel)
    throw new  ConflictException({
     error : 'Channel already exists',
     channel : prevChannel
    });

    // const channelId = MessagingService.getChannelId(params.userIds.concat(ownerId))
    const channel = this.channelRepository.create({
      // id: users.length == 1 ? channelId : ulid(),
      id : ulid(),
      users : users.concat(owner),
      owner : owner,
      name : params.userIds.join(','),  
      hash : channelHash,
      type : users.length == 2 ? ChannelType.INDIVIDUAL : ChannelType.GROUP
    });
    await this.channelRepository.save(channel);
    return channel;
  }
  async sendMessage(senderId : string,params : SendMessageDTO){
    const sender = await this.userRepository.findOne({
      where : {
        id : senderId
      },
      // relations : {
      //   channels : true
      // }
    });
    if(!sender)
    throw new BadRequestException('invalid sender id');
    let channel = new Channel();
    channel.id = params.channelId;
    const message = this.messageRepository.create({
      id : ulid(),
      channel : channel,
      content : params.content,
      status : MessageStatus.UNREAD,
      sender : sender,
    });
 
    try{
      await this.messageRepository.save(message);
      return message;
    }catch(e){
      //test if this messages is sent to a regular user
      console.log("error sending message : ",e );
      
        if(IsForeignKeyConstraintError(e)){
          throw new BadRequestException('Channel does not exist');
      
        
        
      }
      else
      throw new InternalServerErrorException('Something went wrong while saving message')
     
    }
  }
  async getMessages(userId : string,getMessagesDto : GetMessagesDTO){ 
   const query = this.messageRepository.createQueryBuilder('message');
   let channelId;
   // for messages between individual users
    if(getMessagesDto.channelId[0] == 'U'){
     channelId = MessagingService.getChannelId([userId,getMessagesDto.channelId])

    }
    else channelId = getMessagesDto.channelId
   console.log("getting messages for channel : ",channelId);

   query.skip(getMessagesDto.offset || 0);
   query.take(getMessagesDto.limit || 10);
   query.where('message.channelId = :channelId', {channelId : channelId});
   //preload sender
   query.leftJoinAndSelect('message.sender', 'sender');

  //  query.orderBy('message.createdAt', 'DESC');
  //  console.log("query sql : ",query.getSql())
   const [messages,count] = await query.getManyAndCount();
   // TODO : Deal with the database write success but network operation fail in the controller
   await this.messageRepository.update({
    sentAt : null
   },{
    sentAt : new Date().toISOString()
   })
   return {
    data : messages,
    count : count,
   };
 
  }
  async markMessage(userId : string,markMessageDto : MarkMessageDTO){
    const message = await this.messageRepository.findOne({
      where : {
        id : markMessageDto.messageId
      },
      relations : {
        sender : true,
      }
    });
    if(!message)
    throw new BadRequestException('Message with id : ' + markMessageDto.messageId + ' does not exist');
    if(message.sender.id != userId){
      throw new ForbiddenException('You are not the owner of this message');
    
    }
    message.status = markMessageDto.status;
    await this.messageRepository.save(message);
    return message;
  


}
async joinChannel(userId : string, channelId : string){
  const user = await this.userRepository.findOne({
    where : {
      id : userId
    }
  });
  if(!user)
  throw new BadRequestException('User with id : ' + userId + ' does not exist');
  const channel = await this.channelRepository.findOne({
    where : {
      id : channelId
    },
    relations :{
      users : true
    }
  });
  if(!channel)
  throw new BadRequestException('Channel with id : ' + channelId + ' does not exist');
  channel.users.push(user);
  await this.channelRepository.save(channel);
  return channel;

} async getChannels(userId : string){
  const query = this.channelRepository.createQueryBuilder('channel');
  query.leftJoinAndSelect('channel.users', 'user');
  // console.log('query sql : ',query.getSql())
  const channels = await query.getMany();
  return channels.filter((c) => c.users.map((u) => u.id).includes(userId));
}
static getChannelId(userIds : string[]){
 const channelIdString  = userIds.sort((a, b) => a.localeCompare(b)).join(',');
 const channelId = createHash('sha256').update(channelIdString).digest('hex');
 return sha256ToUlid(channelId);

}
async getUnreadMessages(userId : string){
  const query = this.messageRepository.createQueryBuilder('message');
  query.leftJoinAndSelect('message.sender', 'sender');
  query.where('message.status = :status', {status : MessageStatus.UNREAD});
  query.andWhere('message.channelId IN (:...channelIds)', {channelIds : (await this.getChannels(userId)).map((c) => c.id)});
  return query.getMany();
}

}
function IsForeignKeyConstraintError(e: any) : boolean{
  return true;
}

