import {Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {UsersModel} from "./users.interface";
import {randomBytes} from "crypto";

@Injectable()
export class UsersService {
    private users: Array<UsersModel> = [];

    public findAll() : Array<UsersModel>{
        return this.users;
    }

    public findOne(id : string) : UsersModel {
        const user : UsersModel = this.users.find(user => user.id === id);

        if (!user){
            throw new NotFoundException('User not found');
        }

        return user;
    }

    public create(user: UsersModel) : UsersModel {
        //check if the user already exists.
        const userExists: boolean = this.users.some((item) => item.email == user.email)
        if (userExists){
            throw new UnprocessableEntityException('A user with this email already exists');
        }

        const id: string = randomBytes(20).toString('hex');
        const created_at = new Date();
        const updated_at = new Date();

        const newUser: UsersModel = {
            ...user,
            id,
            created_at,
            updated_at
        };

        this.users.push(newUser);
        return  newUser;
    }

    public delete(id: string) : void {
        const index: number = this.users.findIndex(user => user.id === id);

        // if -1 is returned it means no user with this id was found.
        if (index === -1){
            throw new NotFoundException("User not found");
        }

        this.users.splice(index, 1);
    }

    public update(id: string, user: UsersModel) : UsersModel {
        const index: number = this.users.findIndex(user => user.id === id);

        if (index === -1){
            throw new NotFoundException("User not found");
        }

        const emailExists: boolean = this.users.some((item) => item.email === user.email && item.id !== id);
        if (emailExists){
            throw new UnprocessableEntityException("The provided email address is already in use");
        }

        const updated_at = new Date();

        const updatedUser : UsersModel = {
            ...user,
            id,
            updated_at,
        };

        this.users[index] = updatedUser;
        return updatedUser;
    }
}
