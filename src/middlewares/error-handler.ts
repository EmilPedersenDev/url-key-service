import { BaseError, NotFoundError } from '../common/errors';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status';

class ErrorHandler {
  public static handleError(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof BaseError) {
      res.status(err.statusCode).send({
        error: err.statusCode,
        message: err.message,
      });
    }
    res.status(500).send({
      error: 500,
      message: err?.message || 'Internal server error',
    });
  }

  public static undefinedRoute(req: Request, _res: Response, next: NextFunction): void {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
  }

  public static handleUncaughtError(_err: Error): void {
    // Todo: implement
  }
}

export default ErrorHandler;
