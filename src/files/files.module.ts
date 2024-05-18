import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataFile } from './entities/file.entity';
import { FilesService } from './local-files.service';
import { FilesController } from './files.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([DataFile]),
        forwardRef(() => UsersModule),
       
    
    ],
    providers: [
    {
    provide : 'IFilesService',
    useClass : FilesService
    }],
    controllers: [FilesController],
    exports: [
    {
    provide : 'IFilesService',
    useClass : FilesService
    }]
})
export class FilesModule {}
