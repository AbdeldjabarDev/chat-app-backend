import { User } from "../../users/entities/user.entity";
import { MessageStatus } from "../dto/mark-message.dto";
import  {Channel}  from "./channel.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { MessageType } from "../dto/send-message.dto";

@Entity()
export class Message {
    @PrimaryColumn()
    id: string;
    
    @Column()
    content: string;   
    
    @Index()
    @ManyToOne(() => Channel, (channel) => channel.messages)
    channel : Channel;
    
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.messages)
    @JoinColumn()
    sender : User
    
    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    status : MessageStatus


    @Column({
      default : MessageType.RICH_TEXT
    })
    type : MessageType

    @Column({
        nullable : true,
    })
    readAt : Date

    @Column({
        nullable : true,
    })
    sentAt : Date
     
    @Column({
        nullable : true,
    })
    deletedAtOwner : Date

    @Column({
        nullable : true,
    })
    deletedAtRecipient : Date
    

}
