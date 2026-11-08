import { Router } from 'express';
import { validateQueryWeather } from '../middleware/weather.validates.js';
import { getCurrentWeatherCity } from '../controllers/weather.controller.js';

const router = Router();

router.get('/weather/current', validateQueryWeather, getCurrentWeatherCity);

export default router;
