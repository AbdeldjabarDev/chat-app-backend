import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DataFile {
    @PrimaryColumn()
    id : string

    @CreateDateColumn()
    createdAt: Date; 

    @Column({type: 'bytea'})
    content : Buffer

    @Column()
    type : string

    @Column()
    name : string

    @Column({
        default : 0
    })
    size : number

    @Column({
        default : ""
    })
    uid : string
}