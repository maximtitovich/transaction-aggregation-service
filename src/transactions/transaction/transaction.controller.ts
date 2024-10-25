import { Controller, Get, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionMockService } from '../transaction.mock/transaction.mock.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService, private readonly transactionMockService: TransactionMockService) {}

  @Get('aggregate')
  async fetchAggregatedData(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
) {
    return await this.transactionService.aggregateData(userId, startDate, endDate);
}

@Get('data')
async getData(
  @Query('startDate') startDate: string,
  @Query('endDate') endDate: string,
) {
  return await this.transactionMockService.getTransactions(startDate, endDate);
}
}