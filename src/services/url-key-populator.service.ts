import { UrlKey } from '../models/url-key.model';
import UrlKeyHashService from './url-key-hash-service';

class UrlKeyPopulator {
  private static readonly HASH_COUNT: number = 100;
  public static async populateUrlKeys(): Promise<void> {
    try {
      const urlKeyHashesUnusedCount = await UrlKey.countDocuments({ used: false });
      const urlKeyHashesToUpdate = [];

      if (urlKeyHashesUnusedCount < 100) {
        let createdUrlKeyHashCount = 0;
        while (createdUrlKeyHashCount < UrlKeyPopulator.HASH_COUNT) {
          urlKeyHashesToUpdate.push({
            hash: UrlKeyHashService.createHash(),
            used: false,
          });
          createdUrlKeyHashCount++;
        }

        await UrlKey.insertMany(urlKeyHashesToUpdate, { ordered: false });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default UrlKeyPopulator;
