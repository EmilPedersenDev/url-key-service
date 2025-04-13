import { UrlKey } from '../models/url-key.model';
import { NotFoundError } from '../common/errors';

class UrlKeyService {
  constructor() {}

  public async getUrlKey(): Promise<UrlKey> {
    const urlKey: UrlKey | null = await UrlKey.findOne({ used: false });
    if (!urlKey?.hash) {
      throw new NotFoundError('No url key was provided.');
    }
    return urlKey;
  }

  public async markUrlKeyAsUsed(hash: string): Promise<void> {
    await UrlKey.findOneAndUpdate({ hash }, { $set: { used: true } });
  }
}
export default UrlKeyService;
