import Redis from 'ioredis/built/Redis';
import redisClient from '../common/config/redis-client';
import { Hash } from '../types/url-key.types';
import UrlKeyPopulatorService from './url-key-populator.service';

class CacheService {
  private readonly redisClient: Redis;
  private readonly urlKeyPopulatorService: UrlKeyPopulatorService;
  public static HASH_KEY: string = 'hashes';
  constructor(urlKeyPopulatorService: UrlKeyPopulatorService) {
    this.redisClient = redisClient;
    this.urlKeyPopulatorService = urlKeyPopulatorService;
  }

  public async set(key: string, value: string): Promise<void> {
    await this.redisClient?.set(key, value, 'EX', 3600);
  }

  public async getHashFromCache(): Promise<string | null> {
    const availableHashesCount: number = await this.redisClient.scard(CacheService.HASH_KEY);
    if (availableHashesCount < 100) {
      const newHashes: Array<Hash> = await this.urlKeyPopulatorService.populateHashes();
      await this.populateNewHashes(newHashes.map((item: Hash) => item.hash));
    }
    return this.redisClient.spop(CacheService.HASH_KEY);
  }

  private async populateNewHashes(hashes: string[]): Promise<void> {
    await redisClient.sadd(CacheService.HASH_KEY, ...hashes);
  }
}

export default CacheService;
