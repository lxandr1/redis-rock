import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { randomBytes } from 'crypto';

@Controller('api/v1/producers')
export class ProducerController {
  constructor(private redisService: RedisService) {}

  @Get('/')
  async get(@Query() query: { key: string; type: string; field: string }) {
    let data;

    switch (query.type) {
      case 'hget':
        const fields = query.field ? query.field.split(',') : ['*'];
        data = await this.redisService.hmget(query.key, fields);
        break;
      case 'hgetall':
        data = await this.redisService.hgetall(query.key);
        break;
      default:
        data = await this.redisService.keys('*');
    }

    return {
      message: 'Get all data ',
      data: data,
    };
  }

  @Post('/')
  async create(@Body() body: { type: string; expiry_in: number }) {
    const key = `${body.type}-${randomBytes(16).toString('hex')}`;

    await this.redisService.set(
      key,
      JSON.stringify('Hello World'),
      body.expiry_in,
    );

    console.log('========================================================');
    console.log('SENDING NOTIFICATION TO QUEUE');
    console.log('key:', key);
    console.log('With expiry on:', body.expiry_in + ' seconds');
    console.log('========================================================');

    return {
      message: 'Successfully push into queue',
    };
  }

  @Post('/hash')
  async createHash(@Body() body) {
    const key = `hash-${randomBytes(5).toString('hex')}`;

    if (body || typeof body !== 'object') {
      for (const [field, value] of Object.entries(body)) {
        if (typeof value === 'string' || typeof value === 'number') {
          this.redisService.hset(key, field, value);
        } else {
          throw new Error(
            `Invalid value type for field ${field}: ${typeof value}`,
          );
        }
      }
    }

    return {
      message: `Successfully push into hash with key -> ${key}`,
    };
  }
}
