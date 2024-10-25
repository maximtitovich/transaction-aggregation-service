import { Module } from '@nestjs/common';
import { TransactionMockService } from './transaction.mock/transaction.mock.service';
import { TransactionService } from './transaction/transaction.service';

@Module({
  providers: [TransactionMockService, TransactionService]
})
export class TransactionsModule {}
