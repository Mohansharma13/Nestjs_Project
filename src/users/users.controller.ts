import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ParseIntPipe ,ValidationPipe} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { updatedUserDto } from './dto/update-users.dto';


// type of user data json
export interface User_type {
    id: number;
    name: string;
    email: string;
    role: 'intern' | 'admin' | 'engineer';
}



// decorators are function that start with @ , and they run automaticlly when called
@Controller('users') //decorator this will handle users route
export class UsersController {
    /*
    these are the routs we are going to define
    GET  /users
    Get  /users/:id
    post /users
    patch /users/:id
    delete /users/:id
    */

    // to use the function of userservices we have to define its object i.e userservice= new UserService 
    // but in nestjs we can find our object , in nestjs way i.e in constructor
    constructor(private readonly usersService:UsersService){}

    @Get()  // GET /users or /user?role=value
    findAll(@Query('role') role?: 'intern' | 'admin' | 'engineer'): User_type[] {
        return this.usersService.findAll(role)
    }


    @Get(':id') //GET /users/:id
    findOne(@Param('id',ParseIntPipe) id: number): User_type | undefined {
        const user = this.usersService.findOne(id); // convert string to number

        // is id is not there then throw an error
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    @Post() //post /users
    create(@Body(ValidationPipe) user:CreateUserDto): User_type {
        return this.usersService.create(user)
    }

    @Patch(':id') // patch /user/:id
    update(@Param('id',ParseIntPipe) id:number, @Body(ValidationPipe) userUpdate:updatedUserDto): User_type {
        const updatedUser = this.usersService.update(id, userUpdate);
        
        // if id is not found throw an error
        if (!updatedUser) {
            throw new Error(`User with id ${id} not found`);
        }
        return updatedUser;
    }

    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id: number): { success: boolean; message: string } {
        const deletedUser = this.usersService.delete(id);
        
        // if id is not found throw an error
        if (!deletedUser) {
            return { success: false, message: `User with id ${id} not found` };
        }
        return { success: true, message: `User with id ${id} has been deleted` };
    }


}
