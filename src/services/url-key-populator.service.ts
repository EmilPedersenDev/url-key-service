import { UrlKey } from '../models/url-key.model';
import UrlKeyHashService from './url-key-hash-service';
import { Hash } from '../types/url-key.types';

class UrlKeyPopulatorService {
  public async populateHashes(): Promise<Array<Hash>> {
    const availableHashes: Array<Hash> = await UrlKey.find({ used: false }).select('-createdAt').limit(500);
    if (availableHashes.length < 100) {
      let hashCreationCounter = 0;
      const newHashes: Array<Hash> = [];
      while (hashCreationCounter < 500) {
        newHashes.push({
          hash: UrlKeyHashService.createHash(),
          used: false,
        });
        hashCreationCounter++;
      }
      await UrlKey.insertMany(newHashes, { ordered: false });
      return newHashes;
    }
    return availableHashes;
  }
}

export default UrlKeyPopulatorService;
