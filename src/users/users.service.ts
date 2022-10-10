import {Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {UsersModel} from "./users.interface";
import {randomBytes} from "crypto";
import {User} from "./users.entity";

@Injectable()
export class UsersService {
    private users: Array<UsersModel> = [];

    public findAll() : Promise<User[]>{
        return User.find();
    }

    public findOne(id : string) : Promise<User> {
        const user : Promise<User> = User.findOneBy({
            id: id
        })

        if (!user){
            throw new NotFoundException('User not found');
        }

        return user;
    }

    public async create(user: User) : Promise<User>  {
        //check if the user already exists.
        const userExists: boolean = this.users.some((item) => item.email == user.email)
        if (userExists){
            throw new UnprocessableEntityException('A user with this email already exists');
        }

        const id: string = randomBytes(20).toString('hex');
        const newUser = new User();
        newUser.email = user.email;
        newUser.password = user.password;
        await newUser.save();

        return  newUser;
    }

    public async delete(id: string) : Promise<string> {
        const user : User = await User.findOneBy({
            id: id
        });

        if (!user){
            throw new NotFoundException('User not found');
        }

        await user.remove();
        return "User deleted"
    }

    public async update(id: string, data: UsersModel) : Promise<User> {
        const user : User = await User.findOneBy({
            id: id
        });

        user.email = data.email;
        user.password = data.password;
        return await user.save();
    }
}
