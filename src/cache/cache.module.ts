// src/cache/cache.module.ts
import { Module } from '@nestjs/common';
import { CacheProcessor } from './cache.processor/cache.processor';
import { RedisService } from './redis/redis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../transactions/transaction/transaction.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [    TypeOrmModule.forFeature([Transaction]),
  BullModule.registerQueue({
    name: 'cache',
  }),],
  providers: [CacheProcessor, RedisService],
  exports: [CacheProcessor, RedisService],
})
export class CacheModule {}
