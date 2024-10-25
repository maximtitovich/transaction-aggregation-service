import { Injectable } from '@nestjs/common';
import { TransactionMockService } from '../transaction.mock/transaction.mock.service';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionMockService: TransactionMockService) {}

  async getTransactions(startDate: string, endDate: string) {
    return await this.transactionMockService.getTransactions(startDate, endDate);
  }

  async aggregateDataByUserId(userId: string) {
    const transactions = await this.getTransactions('2023-01-01', '2023-12-31'); // Example date range
    return this.aggregate(transactions, userId);
  }

  private aggregate(transactions: any[], userId: string) {
        // Initialize totals
        let totalEarned = 0;
        let totalSpent = 0;
        let totalPayouts = 0;
    
        // Loop through transactions and aggregate values
        transactions.forEach(transaction => {
            if (transaction.userId === userId) {
                switch (transaction.type) {
                    case 'earned':
                        totalEarned += transaction.amount;
                        break;
                    case 'spent':
                        totalSpent += transaction.amount;
                        break;
                    case 'payout':
                        totalPayouts += transaction.amount;
                        break;
                }
            }
        });
    
        // Calculate balance
        const balance = totalEarned - totalSpent - totalPayouts;
    
        // Return aggregated data
        return {
            userId,
            balance,
            earned: totalEarned,
            spent: totalSpent,
            payout: totalPayouts,
        };
  }
}
