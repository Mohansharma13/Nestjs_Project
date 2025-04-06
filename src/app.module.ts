import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { EmployeesModule } from './employees/employees.module';
// throttler
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule,ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [UsersModule, 
            DatabaseModule,
            EmployeesModule,
            // throttler
            ThrottlerModule.forRoot([{
              ttl: 60000,
              limit: 3,
            }]),
          ],
  controllers: [AppController],
  providers: [AppService, DatabaseService
    // This is the default guard, but you can provide your own
    , {     
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule {}
