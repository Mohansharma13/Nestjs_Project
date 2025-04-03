import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { get } from 'http';

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

    @Get()  // GET /users or /user?role=value
    findAll(@Query('role') role?:'intern' | "admin" | "enginner"){
        return []
    }


    @Get(':id') //GET /users/:id
    findOne(@Param('id') id:string){
        return {id}
    }

    @Post() //post /users
    create(@Body() user:{}){
        return user;
    }

    @Patch(':id') // patch /user/:id
    update(@Param('id') id:string, @Body() userUpdate:{}){
        return {id,...userUpdate}
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return id;
    }


}
