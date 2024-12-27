import { Module } from '@nestjs/common';
import { ProducerController } from './producer.controller';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [ProducerController],
  providers: [],
})
export class ProducerModule {}
