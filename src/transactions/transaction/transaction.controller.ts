import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transaction.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('aggregate')
  async getAggregatedData(@Query('userId') userId: string) {
    return await this.transactionsService.aggregateDataByUserId(userId);
  }
}