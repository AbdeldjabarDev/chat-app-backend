import { Controller, Get, Post, Body, Patch, Param, Delete ,Request, UseGuards, UseInterceptors, UploadedFile, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { IsPublic, UserAuthGuard } from './services/auth-guard.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserFilter } from './dto/user-filter.dto';
@Controller('users')
@UseGuards(UserAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @IsPublic()
  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.signUp(createUserDto);
    return user;
  }
  @IsPublic()
  @Post('sign-in')
  async signIn(@Body() signInDto : SignInDTO) {
    const result = await this.usersService.signIn(signInDto);
    return result;
  }

  @Get('get-profile')
  async getProfile(@Request() request) {
    const result = await this.usersService.getProfile(request['user'].sub);
    return result;
  }

  @Patch('update-profile')
  async updateProfile( @Body() updateUserDto: UpdateProfileDTO,@Request() request) {
 const result = await this.usersService.updateProfile(request['user'].sub,updateUserDto);
 return result;
  }

  @Patch('update-profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async updateProfilePicture(@Request() request,@UploadedFile() file : Express.Multer.File) {
    const result = await this.usersService.updateProfilePicture(request['user'].sub, file.buffer,file.mimetype);
    return result;
  }
  @Get()
  async getUsers(@Query() filter : UserFilter,@Request() request){
    const result = await this.usersService.getUsers(request['user'].sub,filter);
    return result;
  
  }


}
