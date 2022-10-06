import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UsersModel} from "./users.interface";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    public findAll() : Array<UsersModel>{
        return this.usersService.findAll();
    }

    @Get(':id')
    public findOne(@Param('id') id : string) : UsersModel {
        return this.usersService.findOne(id)
    }

    @Post()
    public create(@Body() user: UsersModel) : UsersModel {
        return this.usersService.create(user);
    }

    @Delete(':id')
    public delete(@Param('id') id : string) : void {
        this.usersService.delete(id);
    }

    @Put(':id')
    public update(@Param('id') id: string, @Body() user: UsersModel) : UsersModel {
        return this.usersService.update(id, user);
    }
}
