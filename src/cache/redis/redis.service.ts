import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { RedisMemoryServer } from 'redis-memory-server';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisServer: RedisMemoryServer;

  async onModuleInit() {
    this.redisServer = await RedisMemoryServer.create({
      instance: {
        port: 43567,
      },
    });
  }

  async onModuleDestroy() {
    await this.redisServer.stop();
  }
}
