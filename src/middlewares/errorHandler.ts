import { Request, Response, NextFunction } from 'express';
import { ApiResponseHelper } from '../utils/apiResponse';
import { config } from '../config/env';

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  ApiResponseHelper.error(res, `Route ${req.method} ${req.originalUrl} not found`, 404);
};

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${req.method} ${req.url} ->`, err);

  const errorDetails =
    config.nodeEnv === 'development'
      ? {
          stack: err.stack,
        }
      : undefined;

  ApiResponseHelper.error(res, message, statusCode, errorDetails);
};
