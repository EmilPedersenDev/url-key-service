import { nanoid } from 'nanoid';

class UrlKeyHashService {
  public static createHash(): string {
    return nanoid(21).slice(0, 8);
  }
}

export default UrlKeyHashService;
