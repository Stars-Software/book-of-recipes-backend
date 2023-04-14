import { afterAll, beforeAll, describe, expect, it, test } from '@jest/globals';
import { baseURL, newUser, user } from './config';
const request = require('supertest');

const newTodo = {
  title: 'test',
  isDone: false,
};

describe('todos', () => {
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

  it('initial state should be 0 and status 200', async () => {
    const response = await request(baseURL)
      .get('/todos')
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    expect(response.body.length === 0).toBe(true);
    expect(response.statusCode).toBe(200);
  });

  it('POST | DELETE | UPDATE /todos', async () => {
    const created = await request(baseURL)
      .post('/todos')
      .send(newTodo)
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    const gotById = await request(baseURL)
      .get(`/todos/${created.body.id}`)
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    const list = await request(baseURL)
      .get('/todos')
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    const updated = await request(baseURL)
      .put(`/todos/${created.body.id}`)
      .send({ ...newTodo, isDone: true })
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    const deleted = await request(baseURL)
      .delete(`/todos/${updated.body.id}`)
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    const updatedList = await request(baseURL)
      .get('/todos')
      .set('Authorization', accessToken)
      .set('Cookie', cookies);
      
    expect(list.body.length > 0).toBe(true);
    expect(list.statusCode).toBe(200);
    expect(created.statusCode).toBe(200);
    expect(Array.isArray(gotById.body['sub-tasks'])).toBe(true);
    expect(updated.body.isDone).toBe(true);
    expect(updated.statusCode).toBe(200);
    expect(deleted.statusCode).toBe(200);
    expect(updatedList.body.length === 0).toBe(true);
  });
});
