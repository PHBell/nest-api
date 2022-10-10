import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.entity";

@Module({
  providers: [UsersService, User],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
