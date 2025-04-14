import { UrlKey } from '../models/url-key.model';
import { NotFoundError } from '../common/errors';
import CacheService from './cache.service';

class UrlKeyService {
  private readonly cacheService: CacheService;
  constructor(cacheService: CacheService) {
    this.cacheService = cacheService;
  }

  public async getUrlKey(): Promise<string> {
    const urlKey: string | null = await this.cacheService.getHashFromCache();
    if (!urlKey) {
      throw new NotFoundError('No url key was provided.');
    }
    return urlKey;
  }

  public async markUrlKeyAsUsed(hash: string): Promise<void> {
    await UrlKey.findOneAndUpdate({ hash }, { $set: { used: true } });
  }
}
export default UrlKeyService;
