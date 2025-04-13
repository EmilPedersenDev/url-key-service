import HttpStatus from 'http-status';

enum ErrorNames {
  BaseError = 'BaseError',
  NotFoundError = 'NotFoundError',
  DBError = 'DBError',
}

export class BaseError extends Error {
  public name: string;
  public statusCode: number;
  constructor(
    message: string = 'Internal server error.',
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    name: string = ErrorNames.BaseError,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

export class NotFoundError extends BaseError {
  constructor(errorMsg: string = 'Not Found') {
    super(errorMsg, HttpStatus.NOT_FOUND, ErrorNames.NotFoundError);
  }
}

export class DBError extends BaseError {
  constructor(errorMsg: string = 'Database error') {
    super(errorMsg, HttpStatus.INTERNAL_SERVER_ERROR, ErrorNames.DBError);
  }
}
