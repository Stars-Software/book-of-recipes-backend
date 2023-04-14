import { afterAll, beforeAll, describe, expect, it, test } from '@jest/globals';
import { baseURL, newUser, user } from './config';
const request = require('supertest');

describe('authorization', () => {
  let cookies: string[] = [];
  let accessToken = '';

  beforeAll(async () => {
    await request(baseURL).post('/user/register').send(newUser);
    const authed = await request(baseURL).post('/user/login').send(user);
    cookies = authed.headers['set-cookie'];
    accessToken = authed.body.accessToken;
  });
  afterAll(async () => {
    await request(baseURL)
      .get(`/user/logOut`)
      .set('Authorization', accessToken)
      .set('Cookie', cookies);
  });
  it('should return 200', async () => {
    const response = await request(baseURL)
      .get('/user/refresh')
      .set('Authorization', accessToken)
      .set('Cookie', cookies);
    expect(response.statusCode).toBe(200);
  });
});
