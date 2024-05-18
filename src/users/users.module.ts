import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FilesModule } from 'src/files/files.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserAuthGuard } from './services/auth-guard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JWT_SECRET } from 'src/app.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FilesModule,
    JwtModule.register({
    secret: JWT_SECRET,
    signOptions: {
      expiresIn: '7d'
    }
  })],
  controllers: [UsersController],
  providers: [UsersService,UserAuthGuard,JwtService],
  exports : [UsersService,UserAuthGuard,JwtService]
})
export class UsersModule {}
