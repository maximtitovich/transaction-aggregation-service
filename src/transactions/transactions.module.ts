import { Module } from '@nestjs/common';
import { TransactionMockService } from './transaction.mock/transaction.mock.service';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction/transaction.entity';
import { CacheModule } from '../cache/cache.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    BullModule.registerQueue({
      name: 'cache',
    }),
    CacheModule
  ],
  providers: [TransactionMockService, TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService]
})
export class TransactionsModule {}
