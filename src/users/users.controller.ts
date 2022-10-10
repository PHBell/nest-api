import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UsersModel} from "./users.interface";
import {User} from "./users.entity";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    public findAll() : Promise<User[]>{
        return this.usersService.findAll();
    }

    @Get(':id')
    public findOne(@Param('id') id : string) : Promise<User> {
        return this.usersService.findOne(id)
    }

    @Post()
    public create(@Body() user: User) : Promise<User> {
        return this.usersService.create(user);
    }

    @Delete(':id')
    public delete(@Param('id') id : string) : Promise<string> {
       return this.usersService.delete(id);
    }

    @Put(':id')
    public update(@Param('id') id: string, @Body() user: User) : Promise<User> {
        return this.usersService.update(id, user);
    }
}
