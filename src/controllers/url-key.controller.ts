import { Request, Response } from 'express';
import UrlKeyService from '../services/url-key.service';
import { getUrlKeyService } from '../services/service.factory';
import HttpStatus from 'http-status';

class UrlKeyController {
  public static async getUrlKey(_req: Request, res: Response): Promise<Response<{ urlKey: string }>> {
    const urlKeyService: UrlKeyService = getUrlKeyService();
    const urlKey: string = await urlKeyService.getUrlKey();
    res.on('finish', async () => {
      if (res.statusCode < HttpStatus.BAD_REQUEST) {
        try {
          await urlKeyService.markUrlKeyAsUsed(urlKey);
        } catch (_e: unknown) {
          console.error(`Could not mark the hash: ${urlKey} as used.`);
        }
      } else {
        console.error('Could not mark the hash as used.');
      }
    });
    return res.status(HttpStatus.OK).json({ hash: urlKey });
  }
}

export default UrlKeyController;
