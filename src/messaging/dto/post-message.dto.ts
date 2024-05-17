import { IsArray, IsNumber, IsObject, IsString } from "class-validator";

export class PostMessageDTO{
    @IsNumber()
    version : number

    @IsArray({
        each : true,
        message : "ChannelIds must be an array of strings",
        
    })
    channelIds : string[]
    @IsObject()
    payload : Object


}