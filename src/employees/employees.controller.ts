import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service.js';
import {  employee } from '../database/schema.js';
import type { ROLE } from '../users/users.controller.js';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

export type EmployeeCreateInput = typeof employee.$inferInsert
export type EmployeeUpdateInput = Partial<typeof employee.$inferInsert>;

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }
  @SkipThrottle({default: false})
  @Get()
  findAll(@Query('role') role?: ROLE) {
    return this.employeesService.findAll(role);
  }
  @Throttle({short: {ttl: 1000,limit: 1}})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
