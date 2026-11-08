# Weather API

A RESTful Weather API built with Node.js, TypeScript, and Express. It uses the Open-Meteo API to retrieve current weather information for a given city.

## Features

- Get current weather by city name.
- Automatic city geocoding using Open-Meteo.
- Weather information including temperature, humidity, wind speed, and weather description.
- Input validation and centralized error handling.
- Security middleware with Helmet and CORS.
- Automated smoke tests using Jest and Supertest.

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Axios
- Open-Meteo API
- Jest
- Supertest
- Helmet
- Morgan

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Eugenekime/weather-api
```

2. Navigate to the project directory:

```bash
cd weather-api
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root:

```env
PORT=3000
```

## Environment Variables

| Variable | Description             | Default |
| -------- | ----------------------- | ------- |
| `PORT`   | Port used by the server | `3000`  |

No API key is required. This project uses the free Open-Meteo API.

## Running in Development

Start the development server:

```bash
npm run dev
```

The server will run at:

```text
http://localhost:3000
```

## Build and Production

Compile TypeScript:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Running Tests

Run automated smoke tests:

```bash
npm test
```

The smoke tests verify:

- `GET /api/health` returns HTTP 200.
- The weather endpoint returns weather data for a valid city.
- The weather endpoint returns HTTP 400 when the city parameter is missing.

## API Endpoints

### 1. Health Check

Check whether the API is running.

**Request:**

```http
GET /api/health
```

**Example:**

```http
http://localhost:3000/api/health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-11-08T07:45:00.000Z"
}
```

### 2. Get Current Weather

Retrieve current weather information for a city.

**Request:**

```http
GET /api/weather/current?city=Seoul
```

**Query Parameters:**

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `city`    | String | Yes      | City name   |

**Example:**

```http
http://localhost:3000/api/weather/current?city=Seoul
```

**Successful Response (200):**

```json
{
  "city": "Seoul",
  "country": "South Korea",
  "success": true,
  "weather": {
    "description": "moderate drizzle",
    "feelsLike": 2.6,
    "humidity": 86,
    "temperature": 4.9,
    "windSpeed": 4.7
  }
}
```

_Note: Weather values are examples. Actual results depend on current weather conditions._

### Error Responses

**400 Bad Request — Missing or invalid city:**

```json
{
  "message": "Please provide a valid city name"
}
```

**404 Not Found — City not found:**

```json
{
  "success": false,
  "statusCode": 404,
  "message": "City not found"
}
```

**500 Internal Server Error — External API failure:**

```json
{
  "success": false,
  "statusCode": 500,
  "message": "Failed to fetch weather data"
}
```

## External API

Weather data is provided by [Open-Meteo](https://open-meteo.com/).

- [Open-Meteo Weather API](https://open-meteo.com/en/docs)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
