import { Request, Response } from 'express';
import UrlKeyService from '../services/url-key.service';
import { getUrlKeyService } from '../services/service.factory';
import HttpStatus from 'http-status';
import { UrlKey } from '../models/url-key.model';

class UrlKeyController {
  public static async getUrlKey(_req: Request, res: Response): Promise<Response<{ urlKey: string }>> {
    const urlKeyService: UrlKeyService = getUrlKeyService();
    const urlKey: UrlKey = await urlKeyService.getUrlKey();
    res.on('finish', async () => {
      if (res.statusCode < HttpStatus.BAD_REQUEST) {
        try {
          await urlKeyService.markUrlKeyAsUsed(urlKey.hash);
        } catch (_e: unknown) {
          console.error(`Could not mark the hash: ${urlKey.hash} as used.`);
        }
      } else {
        console.error('Could not mark the hash as used.');
      }
    });
    return res.status(HttpStatus.OK).json({ hash: urlKey.hash });
  }
}

export default UrlKeyController;
