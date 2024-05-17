import { Controller, Get, Post, Body, Patch, Param, Delete ,Request, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { IsPublic, UserAuthGuard } from './services/auth-guard.service';
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


}
