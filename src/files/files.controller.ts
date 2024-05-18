import { Controller, Get, Inject, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { IFilesService } from "./interfaces/files.service.interface";
import { Response ,Request} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserAuthGuard } from "../users/services/auth-guard.service";

@Controller('files')
@UseGuards(UserAuthGuard)
export class FilesController {
    @Inject('IFilesService')
    private readonly filesService: IFilesService;
    @Get(':id')
    async getFileWithId(@Param('id') id,@Response() response) {
        const file = await this.filesService.findOne(id);
        response.set({
            'Content-Type': file.type,
            'Content-Length': file.size
        });
        response.send(file.content);    
    }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file : Express.Multer.File,@Request() request) {
        console.log("file type : ",file.mimetype);
        console.log("file name : ",file.filename);
        console.log("file original name : ",file.originalname);  

        const fileId =await  this.filesService.uploadFile(file.originalname,file.buffer,file.mimetype,request['user'].sub);
        return {
            id : fileId
        }
    }
}