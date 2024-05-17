import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataFile } from './entities/file.entity';
import { FilesService } from './local-files.service';

@Module({
    imports: [TypeOrmModule.forFeature([DataFile])],
    providers: [{
    provide : 'IFilesService',
    useClass : FilesService
    }],
    controllers: [],
})
export class FilesModule {}
