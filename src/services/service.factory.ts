import UrlKeyService from './url-key.service';
import CacheService from './cache.service';
import UrlKeyPopulatorService from './url-key-populator.service';

export const getUrlKeyService = () => {
  const urlKeyPopulatorService = new UrlKeyPopulatorService();
  const cacheService = new CacheService(urlKeyPopulatorService);
  return new UrlKeyService(cacheService);
};
