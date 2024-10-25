import { Injectable } from '@nestjs/common';
import { Transaction } from '../transaction/transaction.entity';

@Injectable()
export class TransactionMockService {
  async getTransactions(startDate: string, endDate: string): Promise<Transaction[]> {
    // Mock data for demonstration; in practice, you would fetch this from an API
    return [
        {
            id: '41bbdf81-735c-4aea-beb3-3e5f433a30c5',
            userId: '074092',
            createdAt: new Date('2023-03-16T12:33:11.000Z'), // Convert to Date object
            type: 'payout',
            amount: 30,
          },
          {
            id: '41bbdf81-735c-4aea-beb3-3e5fasfsdfef',
            userId: '074092',
            createdAt: new Date('2023-03-12T12:33:11.000Z'), // Convert to Date object
            type: 'spent',
            amount: 12,
          },
          {
            id: '41bbdf81-735c-4aea-beb3-342jhj234nj234',
            userId: '074092',
            createdAt: new Date('2023-03-15T12:33:11.000Z'), // Convert to Date object
            type: 'earned',
            amount: 1.2,
          },
      ];
  }
}
