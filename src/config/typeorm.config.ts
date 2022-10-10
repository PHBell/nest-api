import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {User} from "../users/users.entity";

export const typeormConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "nest",
    password: "nest",
    database: "nest",
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
}