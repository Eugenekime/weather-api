export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

export interface CurrentWeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}

export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  feelsLike: number;
  windSpeed: number;
}
