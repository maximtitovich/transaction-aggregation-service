import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionMockService {
  async getTransactions(startDate: string, endDate: string) {
    // Return mock transaction data based on the provided date range
    return [
      {
        id: '1',
        userId: '074092',
        createdAt: '2023-03-16T12:33:11.000Z',
        type: 'payout',
        amount: 30,
      },
      {
        id: '2',
        userId: '074092',
        createdAt: '2023-03-12T12:33:11.000Z',
        type: 'spent',
        amount: 12,
      },
      {
        id: '3',
        userId: '074092',
        createdAt: '2023-03-15T12:33:11.000Z',
        type: 'earned',
        amount: 1.2,
      },
    ];
  }
}