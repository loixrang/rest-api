import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service.js';

export type ROLE = 'INTERN' | 'ENGINEER' | "ADMIN"
export interface USER {
  name: string,
  email: string,
  role: ROLE
}

@Controller('users')
export class UsersController {

  constructor (private readonly userService: UsersService) {}

 @Get() //GET /users or /users/?role=value
 findAll(@Query('role') role?: ROLE) {
  return this.userService.findAll(role)
 }

 @Get(':id') //GET /users/:id
 findOne(@Param('id') id: string) {
  return this.userService.findOne(+id)
 } 

 @Post()
 create(@Body() user: USER) {
  return this.userService.create(user)
 }

 @Patch(':id') //PATCH /users/:id
 update(@Param('id') id: string, @Body() userUpdate: {
      name?: string;
      email?: string;
      role?: ROLE;
    }) {
  return this.userService.update(+id, userUpdate)
 } 

 @Delete(':id') //DELETE /users/:id
 delete(@Param('id') id: string) {
  return this.userService.delete(+id)
 } 
}