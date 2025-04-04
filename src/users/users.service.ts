import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { updatedUserDto } from './dto/update-users.dto';

import { NotFoundException } from '@nestjs/common';
interface User_type {
    id: number;
    name: string;
    email: string;
    role: 'intern' | 'admin' | 'engineer';
}

@Injectable()
export class UsersService {

    // we are defining data for user but for storing the data use databases
    private users: User_type[] = [
        { id: 1, name: "John Doe", email: "john.doe@example.com", role: "admin" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "engineer" },
        { id: 3, name: "Robert Johnson", email: "robert.j@example.com", role: "engineer" },
        { id: 4, name: "Emily Davis", email: "emily.d@example.com", role: "admin" },
        { id: 5, name: "Michael Wilson", email: "michael.w@example.com", role: "intern" }
    ];

    // return all the data or if you provide role it will return role specific data
    // if you Send req like localhost:3000/users?role=admin this will return admin data
    findAll(role?: 'intern' | 'admin' | 'engineer'): User_type[] {
        const role1 = this.users.filter(user => user.role === role) ;
        if (role1.length === 0) {
            throw new NotFoundException(`No user found with role ${role}`);
        }
        return role ? role1 : this.users;
    }

    // find user with specific id
    findOne(id: number): User_type | undefined {
        const user= this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    //  this will create new user and create new id accoding to id present in database
    create(user: CreateUserDto): User_type {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser: User_type = {
            id: this.users.length > 0 ? userByHighestId[0].id + 1 : 1,
            ...user
        };
        this.users.push(newUser);
        return newUser;
    }

    //  update user data , you have to provide id and data
    update(id: number, updateUser: updatedUserDto): User_type | undefined {
        let updatedUser: User_type | undefined;
        this.users = this.users.map(user => {
            if (user.id === id) {
                updatedUser = { ...user, ...updateUser };
                return updatedUser;
            }
            return user;
        });
        return updatedUser;
    }


    // delete the user
    delete(id:number):User_type | undefined{
        const removeduser=this.findOne(id)
        this.users=this.users.filter(user=> user.id !==id)
        return removeduser
    }
}
