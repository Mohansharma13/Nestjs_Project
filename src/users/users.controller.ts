import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

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
    GET  /users
    Get  /users/:id
    post /users
    patch /users/:id
    delete /users/:id
    */

    constructor(private readonly usersService:UsersService){}

    @Get()  // GET /users or /user?role=value
    findAll(@Query('role') role?: 'intern' | 'admin' | 'engineer'): User_type[] {
        return this.usersService.findAll(role)
    }


    @Get(':id') //GET /users/:id
    findOne(@Param('id') id: string): User_type | undefined {
        const user = this.usersService.findOne(+id); // convert string to number
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    @Post() //post /users
    create(@Body() user:{ name: string; email: string; role: 'intern' | 'admin' | 'engineer' }): User_type {
        return this.usersService.create(user)
    }

    @Patch(':id') // patch /user/:id
    update(@Param('id') id:string, @Body() userUpdate:{ name?: string; email?: string; role?: 'intern' | 'admin' | 'engineer' }): User_type {
        const updatedUser = this.usersService.update(+id, userUpdate);
        
        if (!updatedUser) {
            throw new Error(`User with id ${id} not found`);
        }
        return updatedUser;
    }

    @Delete(':id')
    delete(@Param('id') id: string): { success: boolean; message: string } {
        const deletedUser = this.usersService.delete(+id);
        if (!deletedUser) {
            return { success: false, message: `User with id ${id} not found` };
        }
        return { success: true, message: `User with id ${id} has been deleted` };
    }


}
