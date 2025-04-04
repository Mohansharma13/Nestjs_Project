import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types"; //npm i @nestjs/mapped-types -D

export class updatedUserDto extends PartialType(CreateUserDto) {
    // PartialType will make all the properties optional
    // name?: string;
    // email?: string;
    // role?: 'intern' | 'admin' | 'engineer';
}