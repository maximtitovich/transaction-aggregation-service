import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { CacheModule } from './cache/cache.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { Transaction } from './transactions/transaction/transaction.entity';

@Module({
  imports: [
    CacheModule, 
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:', // Use in-memory database for testing
      entities: [Transaction],
      synchronize: true,
    }),
    TransactionsModule,
    BullModule.forRoot({
      // Your Redis configuration here, if necessary
      redis: {
        host: 'localhost', // Adjust as needed for your in-memory setup
        port: 43567, // Default Redis port
      },
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
