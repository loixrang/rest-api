import { Injectable } from '@nestjs/common';
import {  employee } from '../database/schema.js';
import { DatabaseService } from '../database/database.service.js';
import { EmployeeCreateInput, EmployeeUpdateInput } from './employees.controller.js';
import { ROLE } from '../users/users.controller.js';
import { eq } from 'drizzle-orm';

@Injectable()
export class EmployeesService {
  constructor (private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: EmployeeCreateInput) {
    return await this.databaseService.db.insert(employee).values(createEmployeeDto).returning();
  }

  async findAll(role?: ROLE) {
    if (role) {
      return await this.databaseService.db.select().from(employee).where(eq(employee.role, role))
    }
    return (await this.databaseService.db.select().from(employee))
  }

  async findOne(id: number) {
    return await this.databaseService.db.select().from(employee).where(eq(employee.id, id)).limit(1)
  }

  async update(id: number, updateEmployeeDto: EmployeeUpdateInput) {
    return await this.databaseService.db.update(employee).set(updateEmployeeDto).where(eq(employee.id, id)).returning()
  }

  async remove(id: number) {
    return await this.databaseService.db.delete(employee).where(eq(employee.id, id)).returning()
  }
}
