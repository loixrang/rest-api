import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';

export type ROLE = 'INTERN' | 'ENGINEER' | "ADMIN"

@Controller('users')
export class UsersController {

  constructor (private readonly userService: UsersService) {}

 @Get() //GET /users or /users/?role=value
 findAll(@Query('role') role?: ROLE) {
  return this.userService.findAll(role)
 }

 @Get(':id') //GET /users/:id
 findOne(@Param('id', ParseIntPipe) id: number) {
  return this.userService.findOne(id)
 } 

 @Post()
 create(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
  return this.userService.create(createUserDTO)
 }

 @Patch(':id') //PATCH /users/:id
 update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDTO: UpdateUserDTO) {
  return this.userService.update(id, updateUserDTO)
 } 

 @Delete(':id') //DELETE /users/:id
 delete(@Param('id', ParseIntPipe) id: number) {
  return this.userService.delete(id)
 } 
}