import { Injectable } from '@nestjs/common';

interface User_type {
    id: number;
    name: string;
    email: string;
    role: 'intern' | 'admin' | 'engineer';
}

@Injectable()
export class UsersService {
    private users: User_type[] = [
        { id: 1, name: "John Doe", email: "john.doe@example.com", role: "admin" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "engineer" },
        { id: 3, name: "Robert Johnson", email: "robert.j@example.com", role: "engineer" },
        { id: 4, name: "Emily Davis", email: "emily.d@example.com", role: "admin" },
        { id: 5, name: "Michael Wilson", email: "michael.w@example.com", role: "intern" }
    ];

    findAll(role?: 'intern' | 'admin' | 'engineer'): User_type[] {
        return role ? this.users.filter(user => user.role === role) : this.users;
    }

    findOne(id: number): User_type | undefined {
        return this.users.find(user => user.id === id);
    }

    create(user: { name: string; email: string; role: 'intern' | 'admin' | 'engineer' }): User_type {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser: User_type = {
            id: this.users.length > 0 ? userByHighestId[0].id + 1 : 1,
            ...user
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUser: { name?: string; email?: string; role?: 'intern' | 'admin' | 'engineer' }): User_type | undefined {
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

    delete(id:number):User_type | undefined{
        const removeduser=this.findOne(id)
        this.users=this.users.filter(user=> user.id !==id)
        return removeduser
    }
}
