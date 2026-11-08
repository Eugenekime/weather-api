import type { Request, Response, NextFunction } from 'express';
import HttpError from '../utils/httpError.js';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err instanceof HttpError ? err.statusCode : 500;

  const message =
    err instanceof HttpError ? err.message : 'Failed to fetch weather data';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
}
