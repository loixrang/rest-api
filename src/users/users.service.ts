import { Injectable } from '@nestjs/common';
import { type ROLE, USER } from './users.controller.js';

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
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: USER) {
    const usersByHighestID = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestID[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: ROLE;
    },
  ) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return { ...user, ...updatedUser}
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
