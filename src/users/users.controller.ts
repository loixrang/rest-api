import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
 @Get() //GET /users
 findAll() {
  return []
 }

 @Get("/interns") //GET /users/intern
 findAllInterns() {
  return []
 }

 @Get(':id') //GET /users/:id
 findOne(@Param('id') id: string) {
  return {id}
 } 

 @Post()
 create(@Body() user: {}) {
  return user
 }

 @Patch(':id') //PATCH /users/:id
 update(@Param('id') id: string, @Body() userUpdate: {}) {
  return {id, ...userUpdate}
 } 

 @Delete(':id') //DELETE /users/:id
 delete(@Param('id') id: string) {
  return {id}
 } 
}