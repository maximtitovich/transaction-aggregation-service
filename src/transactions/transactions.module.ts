import { Module } from '@nestjs/common';
import { TransactionMockService } from './transaction.mock/transaction.mock.service';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  providers: [TransactionMockService, TransactionService],
  controllers: [TransactionController]
})
export class TransactionsModule {}
