import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: parseInt(this.configService.get('REDIS_PORT')),
      password: this.configService.get('REDIS_PASSWORD'),
    });

    console.log('Redis client connected');
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return this.client.keys(pattern);
  }

  async set(
    key: string,
    value: string,
    expiryInSeconds?: number,
  ): Promise<string> {
    if (expiryInSeconds) {
      return this.client.set(key, value, 'EX', expiryInSeconds);
    }
    return this.client.set(key, value);
  }

  async del(key: string): Promise<number> {
    return this.client.del(key);
  }

  getClient(): Redis {
    return this.client;
  }

  // how to get multiple attributes from a hash
  async hmget(key: string, fields: string[]): Promise<string[]> {
    return this.client.hmget(key, ...fields);
  }

  async hget(key: string, field: string): Promise<string | null> {
    return this.client.hget(key, field);
  }

  async hgetall(key: string): Promise<Record<string, string | number>> {
    return this.client.hgetall(key);
  }

  async hset(
    key: string,
    field: string,
    value: string | number,
    expiry_in?: number,
  ): Promise<number> {
    const hsetPayload = this.client.hset(key, field, value);

    if (expiry_in) {
      this.client.expire(key, expiry_in);
    }

    return hsetPayload;
  }

  async hdel(key: string, field: string): Promise<number> {
    return this.client.hdel(key, field);
  }

  async onModuleDestroy() {
    await this.client.quit();
    console.log('Redis client disconnected successfully');
  }
}
