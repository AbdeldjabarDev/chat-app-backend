import { DataSource } from "typeorm"
import 'dotenv/config';
import { Message } from "../src/messaging/entities/message.entity";
import { User } from "../src/users/entities/user.entity";
import { DataFile } from "../src/files/entities/file.entity";
import { Channel } from "../src/messaging/entities/channel.entity";
const POSTGRES_PORT = process.env.POSTGRES_PORT ;
const POSTGRES_HOST = process.env.POSTGRES_HOST ;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ;
const POSTGRES_USER = process.env.POSTGRES_USER ;
const POSTGRES_DB = process.env.POSTGRES_DB ;1
// const TOKEN_SECRET = process.env.TOKEN_SECRET;
    const globalDataSource = new DataSource({
        type: 'postgres',
        host: POSTGRES_HOST,
        port: Number(POSTGRES_PORT),
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        entities: [Message,User,DataFile,Channel],
        synchronize: false,
        migrations : ['./db/migrations/*.js'],
        migrationsTableName: "typeorm_migrations",
      })
export default globalDataSource