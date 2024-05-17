import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDTO {
    @IsString()
    @IsOptional()
    name : string

    // @IsString()
    // @IsOptional()
    // profilePicture : string


    
}
