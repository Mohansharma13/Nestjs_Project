import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DatabaseModule } from '../database/database.module'; // Import the DatabaseModule that we have created

@Module({
  imports: [DatabaseModule], // Import the DatabaseModule here
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
