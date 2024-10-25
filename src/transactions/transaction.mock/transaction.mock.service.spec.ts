import { Test, TestingModule } from '@nestjs/testing';
import { TransactionMockService } from './transaction.mock.service';

describe('TransactionMockService', () => {
  let service: TransactionMockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionMockService],
    }).compile();

    service = module.get<TransactionMockService>(TransactionMockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
