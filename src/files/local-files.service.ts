import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFile } from './entities/file.entity';
import { Repository } from 'typeorm';
import { FILE_SIZE_LIMIT } from './constants';
import { ulid } from 'ulid';
import { IFileService } from './interfaces/files.service.interface';
@Injectable()
export class FilesService implements IFileService {
    constructor(
    @InjectRepository(DataFile) 
    private fileRepository : Repository<DataFile>) {}
    async uploadFile(name : string, file : Buffer,type : string,uid : string) : Promise<string>{
        if(file.length > FILE_SIZE_LIMIT){
            throw new BadRequestException('File size too large');
        }
        const f = await this.fileRepository.save({id: ulid(),name : name, content : file, type : type,uid : uid,size : file.length});
        return f.id;  
    }
    
    findAll() {
        return `This action returns all files`;
    }
    
    async findOne(id: string) : Promise<DataFile> {
     const f = await this.fileRepository.findOne({
            where : {
                id : id
            }
      });
      return f;
    }
    async getFileInfo(id : string){
      const f = await this.fileRepository.findOne({
            where : {
                id : id
            },
            select : {
                name : true,
                type : true,
                size : true,
                id : true,
                uid : true,
            }            
      });
      return f;
    }
    update(id: number, updateFileDto: any) {
        return `This action updates a #${id} file`;
    }
    
    remove(id: string) {
        return `This action removes a #${id} file`;
    }
}
