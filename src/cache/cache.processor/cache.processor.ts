import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';

@Processor('cache')
@Injectable()
export class CacheProcessor {
  constructor() {}

  @Process('cacheUpdate')
  async handleCacheUpdate(job: Job) {
    const { userId, aggregatedData } = job.data;

    // Logic for updating cache (if needed) can be implemented here
    const cacheKey = `user:${userId}:aggregate`;
    
    // Update the cache in Redis (assuming Redis client is available here)
    await job.queue.client.setex(
      cacheKey,
      120, // Set expiration time
      JSON.stringify(aggregatedData),
    );
  }
}