import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TransactionService {
    private readonly CACHE_EXPIRATION = 120; // Cache expiration time in seconds

    constructor(
      @InjectRepository(Transaction)
      private transactionRepository: Repository<Transaction>,
      @InjectQueue('cache') // Inject the Bull queue for caching
      private cacheQueue: Queue,
      private readonly httpService: HttpService,
    ) {}
  
    async aggregateData(userId: string, startDate: string, endDate: string) {
      const cacheKey = `user:${userId}:aggregate`;
  
      // Check if the data exists in the cache (direct Redis interaction via Bull)
      const cachedData = await this.getCachedData(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData); // Return cached data if it exists
      }
  
      // Fetch transaction data from the mock data
      const transactions = await this.fetchTransactions(startDate, endDate);
  
      // Aggregate the transaction data
      const aggregatedData = this.calculateAggregatedValues(transactions);
  
      // Store the aggregated data in the cache with expiration
      await this.cacheData(cacheKey, aggregatedData);
  
      // Add cache update job to the queue
      await this.cacheQueue.add('cacheUpdate', { userId, aggregatedData });
  
      return aggregatedData; // Return the aggregated data
    }

    private async fetchTransactions(startDate: string, endDate: string) {
        const url = `http://localhost:3000/transactions/data?startDate=${startDate}&endDate=${endDate}`;
        const response = await firstValueFrom(this.httpService.get(url));
        return response.data; // Assuming the response structure matches what you expect
      }
  
    private calculateAggregatedValues(transactions: Transaction[]) {
      let balance = 0;
      let earned = 0;
      let spent = 0;
      let payout = 0;
  
      transactions.forEach((transaction) => {
        switch (transaction.type) {
          case 'earned':
            earned += transaction.amount;
            balance += transaction.amount; // Update balance
            break;
          case 'spent':
            spent += transaction.amount;
            balance -= transaction.amount; // Update balance
            break;
          case 'payout':
            payout += transaction.amount;
            balance -= transaction.amount; // Update balance
            break;
        }
      });
  
      return {
        balance,
        earned,
        spent,
        payout,
        paidOut: payout, // Assuming paid out is the same as payout
      };
    }
  
    async getRequestedPayouts(userId: string) {
      const transactions = await this.transactionRepository.find({
        where: { userId, type: 'payout' },
      });
  
      // Aggregate requested payouts
      const aggregatedPayouts = transactions.reduce((acc, transaction) => {
        const existing = acc.find((item) => item.userId === transaction.userId);
        if (existing) {
          existing.amount += transaction.amount; // Sum up amounts
        } else {
          acc.push({ userId: transaction.userId, amount: transaction.amount });
        }
        return acc;
      }, []);
  
      return aggregatedPayouts; // Return aggregated payouts
    }
  
    private async getCachedData(cacheKey: string): Promise<string | null> {
      // Access the Redis client through Bull
      const cachedValue = await this.cacheQueue.client.get(cacheKey);
      return cachedValue || null; // Return null if not found
    }
  
    private async cacheData(cacheKey: string, data: any) {
      // Cache the data in Redis with expiration time using Bull's client
      await this.cacheQueue.client.setex(
        cacheKey,
        this.CACHE_EXPIRATION,
        JSON.stringify(data),
      );
    }
}
