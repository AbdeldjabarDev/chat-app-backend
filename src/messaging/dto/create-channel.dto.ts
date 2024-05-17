import { IsArray } from "class-validator";

export class CreateChannelDTO{
    @IsArray()
    userIds : string[]
}