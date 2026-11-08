import type {
  GeocodingResponse,
  GeocodingResult,
  CurrentWeatherResponse,
  WeatherData,
} from '../types/weather.types.js';
import axios from 'axios';

function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: 'clear sky',
    1: 'mainly clear',
    2: 'partly cloudy',
    3: 'overcast',
    45: 'fog',
    48: 'depositing rime fog',
    51: 'light drizzle',
    53: 'moderate drizzle',
    55: 'dense drizzle',
    61: 'slight rain',
    63: 'moderate rain',
    65: 'heavy rain',
    71: 'slight snow',
    73: 'moderate snow',
    75: 'heavy snow',
    80: 'slight rain showers',
    81: 'moderate rain showers',
    82: 'violent rain showers',
    95: 'thunderstorm',
  };

  return descriptions[code] ?? 'unknown weather';
}

export async function getCityCoordinates(
  city: string
): Promise<GeocodingResult | null> {
  const response = await axios.get<GeocodingResponse>(
    'https://geocoding-api.open-meteo.com/v1/search',
    {
      params: {
        name: city,
        count: 1,
        language: 'en',
      },
    }
  );

  const location = response.data.results?.[0];

  if (!location) {
    return null;
  }

  return location;
}

export async function getCurrentWeather(
  latitude: number,
  longitude: number,
  city: string,
  country: string
): Promise<WeatherData> {
  const response = await axios.get<CurrentWeatherResponse>(
    `https://api.open-meteo.com/v1/forecast`,
    {
      params: {
        latitude,
        longitude,
        current:
          'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
      },
    }
  );

  const current = response.data.current;

  return {
    temperature: current.temperature_2m,
    description: getWeatherDescription(current.weather_code),
    humidity: current.relative_humidity_2m,
    feelsLike: current.apparent_temperature,
    windSpeed: current.wind_speed_10m,
  };
}
