import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';

describe('Smoke Test', () => {
  test('GET /api/health should return 200', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
  });
  test('GET /api/weather/current should return weather for a valid city', async () => {
    const response = await request(app).get('/api/weather/current?city=Seoul');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city');
    expect(response.body.weather).toHaveProperty('temperature');
  });
  test('GET /api/weather/current should return 400 when city is missing', async () => {
    const response = await request(app).get('/api/weather/current');

    expect(response.status).toBe(400);
  });
});
