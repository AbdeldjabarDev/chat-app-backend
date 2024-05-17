import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FilesModule } from 'src/files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthGuard } from './services/auth-guard.service';

@Module({
  imports: [
    FilesModule,
    JwtModule.register({
    secret: process.env.JWT_SECRET_KEY || 'SECRET',
    signOptions: {
      expiresIn: '7d'
    }
  })],
  controllers: [UsersController],
  providers: [UsersService,UserAuthGuard],
})
export class UsersModule {}
