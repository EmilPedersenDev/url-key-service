import Redis from 'ioredis';

const redis: Redis = new Redis({
  host: 'localhost', // For local development
  port: 6379, // Default Redis port
  db: 1,
});

export default redis;
