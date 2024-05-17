import {  IsEnum, IsOptional, IsString } from "class-validator";
export enum MessageType{
    RICH_TEXT = 'RICH_TEXT',
    FILE = 'FILE',
    AUDIO = 'AUDIO',
    VIDEO = 'VIDEO',
    IMAGE = 'IMAGE',
}
export class SendMessageDTO{
    @IsString()
    content: string;

    @IsString()
    channelId : string;

    @IsEnum(MessageType)
    type : MessageType

    
    @IsOptional()
    @IsString()
    parentMessage : string

}