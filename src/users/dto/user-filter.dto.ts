import { IsOptional, IsString } from "class-validator";

export class UserFilter{
    @IsString()
    @IsOptional()
    email : string

    
    @IsString()
    @IsOptional()
    name : string
}