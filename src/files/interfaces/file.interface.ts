export interface IDataFile{
    id : string,
    name : string,
    type : string,
    size : number,
    uid : string,
    content? : Buffer
    createdAt : Date,
    // updated_at : Date
}
export interface IFileInfo{
  name : string,
  size : number,
  type : string,
  id : string,
  uid : string
}