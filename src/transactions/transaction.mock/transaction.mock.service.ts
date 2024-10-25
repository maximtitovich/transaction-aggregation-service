import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionMockService {
  async getTransactions(startDate: string, endDate: string) {
    return {
      items: [
        { id: '1', userId: '123', type: 'earned', amount: 100 },
        { id: '2', userId: '123', type: 'spent', amount: 50 },
      ],
      meta: { totalItems: 1000, itemCount: 2, totalPages: 200 },
    };
  }
}
