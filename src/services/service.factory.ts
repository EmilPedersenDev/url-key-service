import urlKeyService from './url-key.service';

export const getUrlKeyService = () => {
  return new urlKeyService();
};
