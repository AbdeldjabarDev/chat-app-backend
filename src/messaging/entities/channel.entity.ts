import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Message } from "./message.entity";


export enum ChannelType {
    INDIVIDUAL = "INDIVIDUAL",
    GROUP = "GROUP"
}  

@Entity()
export class Channel {
    @PrimaryColumn()
    id : string

    @Column()
    name : string

    @ManyToOne(() => User,(user) => user.ownedChannels)
    @JoinColumn()
    owner : User;
   // create a many to many relationship with users
    @ManyToMany(() => User, user => user.channels)
    users: User[];

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        type : 'enum',
        enum : ChannelType,
        default : ChannelType.INDIVIDUAL
    })
    type : ChannelType 
     
    @Column({nullable : true,type : 'varchar'})
    hash : string

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Message,(message) => message.channel)
    @JoinColumn()
    messages : Message[]
    
}