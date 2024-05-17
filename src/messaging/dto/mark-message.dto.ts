import { IsEnum, IsString } from "class-validator"
export enum MessageStatus{
    READ = "READ",
    UNREAD = "UNREAD"
}
export class MarkMessageDTO{
    @IsString()
    messageId : string

    @IsEnum(MessageStatus)
    status : MessageStatus


}