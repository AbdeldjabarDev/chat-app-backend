import { IsString } from "class-validator";

export class JoinChannelDTO{
    @IsString()
    channelId : string
}