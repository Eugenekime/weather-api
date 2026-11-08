import type { Response, Request, NextFunction } from 'express';
import HttpError from '../utils/httpError.js';
import {
  getCityCoordinates,
  getCurrentWeather,
} from '../services/weather.service.js';

export async function getCurrentWeatherCity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { city } = req.query;
    if (!city || typeof city !== 'string') {
      throw new HttpError(
        'City query parameter is required and must be string',
        400
      );
    }

    const cityCoordinates = await getCityCoordinates(city.toLowerCase().trim());

    if (!cityCoordinates) {
      throw new HttpError('City not found', 404);
    }

    const dataWeather = await getCurrentWeather(
      cityCoordinates.latitude,
      cityCoordinates.longitude,
      cityCoordinates.name,
      cityCoordinates.country_code
    );

    return res.status(200).json({
      success: true,
      city: cityCoordinates.name,
      country: cityCoordinates.country,
      weather: dataWeather,
    });
  } catch (error) {
    next(error);
  }
}
