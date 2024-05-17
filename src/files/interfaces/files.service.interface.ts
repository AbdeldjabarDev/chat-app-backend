import { IDataFile, IFileInfo } from "./file.interface";

export interface IFilesService{
 uploadFile(name : string, file : Buffer,type : string,uid : string)  : Promise<string>;
 findOne(id: string) : Promise<IDataFile>
 getFileInfo(uid : string) : Promise<IFileInfo>
}