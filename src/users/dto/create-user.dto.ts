import { IsEmail, isEnum, IsEnum, IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;

    @IsEnum(['intern', 'admin', 'engineer'], {
        message: 'role must be one of the following: intern, admin, engineer',
    })
    role: 'intern' | 'admin' | 'engineer';
}
