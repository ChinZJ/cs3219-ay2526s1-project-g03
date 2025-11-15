import { Redis } from 'ioredis';
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_TLS } from '../constants/env.js';

// Create Redis client instances
export const createRedisClient = (): Redis => {
  const config: any = {
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT || '6379', 10),
  };

  if (REDIS_PASSWORD) {
    config.password = REDIS_PASSWORD;
  }

  if (REDIS_TLS === 'true') {
    config.tls = {};
  }

  return new Redis(config);
};

// Redis client for regular operations
const redisClient = createRedisClient();

redisClient.on('connect', () => {
  console.log('Matching Service connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redisClient;