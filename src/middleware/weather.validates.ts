import type { Response, Request, NextFunction } from 'express';

export function validateQueryWeather(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { city } = req.query;

  if (typeof city !== 'string' || city.trim().length < 2) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Please provide a valid city name',
    });
  }

  next();
}
