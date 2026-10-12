import { Injectable, OnModuleInit } from '@nestjs/common';
import { db } from './client.js';
import { employee } from './schema.js';
import { sql } from 'drizzle-orm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  readonly db = db
  async onModuleInit() {
    await this.db.execute(sql`SELECT 1`);
  }
}
