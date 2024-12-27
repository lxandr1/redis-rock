import {
  RedisModuleAsyncOptions,
  RedisModuleOptions,
} from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const redisConfig: RedisModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<RedisModuleOptions> => ({
    config: {
      host: configService.get('REDIS_HOST'),
      password: configService.get('REDIS_PASSWORD'),
      port: parseInt(configService.get('REDIS_PORT')),
    },
  }),
  inject: [ConfigService],
};
