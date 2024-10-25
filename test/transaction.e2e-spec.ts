import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // Adjust the path as necessary
import { TransactionService } from '../src/transactions/transaction/transaction.service';
import { RedisMemoryServer } from 'redis-memory-server';

describe('Transaction Aggregation (e2e)', () => {
  let app: INestApplication;
  let transactionService: TransactionService;
  let redisServer: RedisMemoryServer;

  beforeAll(async () => {
    redisServer = await RedisMemoryServer.create({
        instance: {
          port: 43567,
        },
      });


    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    transactionService = moduleFixture.get<TransactionService>(TransactionService);
  });

  afterAll(async () => {
    await redisServer.stop();
    await app.close();
  });

  it('/transactions/aggregate (GET)', async () => {
    const userId = '41bbdf81-735c-4aea-beb3-3e5f433a30c5';
    const startDate = '2023-03-01T00:00:00.000Z';
    const endDate = '2023-03-31T23:59:59.999Z';

    const response = await request(app.getHttpServer())
      .get(`/transactions/aggregate?userId=${userId}&startDate=${startDate}&endDate=${endDate}`)
      .expect(200);

    expect(response.body).toHaveProperty('balance');
    expect(response.body).toHaveProperty('earned');
    expect(response.body).toHaveProperty('spent');
    expect(response.body).toHaveProperty('payout');
  });
});