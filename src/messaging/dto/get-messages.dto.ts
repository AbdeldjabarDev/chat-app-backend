import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { MessageStatus } from "./mark-message.dto";

export class GetMessagesDTO{
    @IsString()
    channelId : string
    @IsOptional()
    @IsNumber()
    offset : number

    @IsOptional()
    @IsNumber()
    limit : number

    @IsOptional()
    @IsNumber()
    tsFrom : number
    
    @IsOptional()
    @IsNumber()
    tsTo : number

    @IsOptional()
    @IsEnum(MessageStatus)
    status : MessageStatus
    
}