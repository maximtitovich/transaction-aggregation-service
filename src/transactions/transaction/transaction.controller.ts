import { Controller, Get, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionService) {}

  @Get('aggregate')
  async getAggregatedData(@Query('userId') userId: string) {
    return await this.transactionsService.aggregateData(userId);
  }
}