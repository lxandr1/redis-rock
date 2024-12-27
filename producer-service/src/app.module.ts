import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProducerModule } from './modules/producer/producer.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [ConfigModule.forRoot(), ProducerModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
