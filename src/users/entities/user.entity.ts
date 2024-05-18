import  {Channel}  from "../../messaging/entities/channel.entity"
import { Message } from "../../messaging/entities/message.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    id : string

    @Column()
    email : string

    @Column()
    name : string

    @Column()
    password : string

    @Column({
        nullable : true
    })
    profilePicture : string

    @OneToMany(() => Message, (message) => message.sender)
    messages : Message[]

    @ManyToMany(() => Channel, (channel) => channel.users)
    @JoinTable({
        name : 'user_channels'
    })
    channels : Channel[]

    @OneToMany(() => Channel, (channel) => channel.owner)
    ownedChannels : Channel[]
  

}
