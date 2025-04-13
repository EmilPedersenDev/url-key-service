import express, { Router } from 'express';
import tryCatch from '../common/try-catch';
import UrlKeyController from '../controllers/url-key.controller';

const urlKeyRouter: Router = express.Router({ mergeParams: true });

urlKeyRouter.route('/').get(tryCatch(UrlKeyController.getUrlKey));

export default urlKeyRouter;
