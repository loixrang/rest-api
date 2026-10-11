import { Injectable, NotFoundException } from '@nestjs/common';
import { type ROLE } from './users.controller.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Samuel',
      email: 'kaksjsk@dkk.ks',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Davies',
      email: 'kaksjsk@dkk.ks',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'Reuben',
      email: 'kaksjsk@dkk.ks',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Ibiok',
      email: 'kaksjsk@dkk.ks',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Favour',
      email: 'kaksjsk@dkk.ks',
      role: 'INTERN',
    },
  ];
  findAll(role?: ROLE) {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (!rolesArray.length) {
        throw new NotFoundException("User Role not found")
      }
      return rolesArray
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user;
  }

  create(createUserDTO: CreateUserDTO) {
    const usersByHighestID = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestID[0].id + 1,
      ...createUserDTO,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updateUserDTO: UpdateUserDTO,
  ) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return { ...user, ...updateUserDTO}
      }
      return user
    })
    return this.findOne(id)
  }

  delete(id: number) {
    const removedUser = this.findOne(id)

    this.users = this.users.filter(user => user.id !== id)

    return removedUser
  }
}
