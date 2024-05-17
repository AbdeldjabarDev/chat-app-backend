import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IFilesService } from 'src/files/interfaces/files.service.interface';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject('IFilesService')
   private readonly filesService: IFilesService;
   
   private readonly jwtService: JwtService;
  async signUp(createUserDto: CreateUserDto) {
    const oldUser = this.userRepository.findOne({
      where : {
        email : createUserDto.email
      }
    }); 
    if(oldUser)
    throw new ConflictException('User with this email already exists');
    const passwordHash = bcrypt.hashSync(createUserDto.password, 10);
    const user =  this.userRepository.create({
      email : createUserDto.email,
      password : passwordHash,
      name : createUserDto.name,
    });
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async signIn(dto : SignInDTO) {
    const user = await this.userRepository.findOne({
      where : {
        email : dto.email
      }
    });
    if(!user)
    throw new NotFoundException('User with this email does not exist please sign up');
    const isPasswordValid = bcrypt.compareSync(dto.password, user.password);
    if(!isPasswordValid)
      throw new UnauthorizedException('Password is incorrect');
    const token = this.jwtService.sign({
      sub : user.id,
      email : user.email,
      name : user.name
    },
    {
      secret : process.env.JWT_SECRET
    });
    if(token)
    return {
  token : token};
  else
  {
    console.log("failed to generate token");
    throw  new InternalServerErrorException('Failed to generate token')
    
  }
   
  }


  async updateProfile(id : string,updateUserDto: UpdateProfileDTO) {
    const user  =await  this.userRepository.findOne({
      where : {
        id : id
      }
    });
    if(!user)
    throw new NotFoundException('User with this id does not exist');
    return this.userRepository.update(user.id,{
      name : updateUserDto.name,
    });
  }

  async updateProfilePicture(id: string,Picture : Buffer,type : string) {
    const user = await this.userRepository.findOne({
      where : {
        id : id
      }
    });
    if(!user)
    throw new NotFoundException('User with this id does not exist');
    const url =await  this.filesService.uploadFile(
      user.id + '_' + 'profile_picture',
     Picture,
    type,
    user.id
  );
  await this.userRepository.update(user.id,{
    profilePicture : url
  });
  return {
    url : url
  }
  
  }
  async getProfile(id : string){
    const user = await this.userRepository.findOne({
      where : {
        id : id
      }
    });
    if(!user)
    throw new NotFoundException('User with this id does not exist');
    return user;
  }
}
