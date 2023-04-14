import { afterAll, beforeAll, describe, expect, it, test } from '@jest/globals';
import { baseURL, newUser, user } from './config';
const request = require('supertest');

const newGroup = {
  title: 'TEST GROUP',
};

describe('groups', () => {
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
      .get('/groups')
      .set('Authorization', accessToken)
      .set('Cookie', cookies);
    expect(response.body.length === 0).toBe(true);
    expect(response.statusCode).toBe(200);
  });

  it('POST | DELETE | UPDATE /todos', async () => {
    const created = await request(baseURL)
      .post('/groups')
      .send(newGroup)
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    const gotById = await request(baseURL)
      .get(`/groups/${created.body.id}`)
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    const list = await request(baseURL)
      .get('/groups')
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    const updated = await request(baseURL)
      .put(`/groups/${created.body.id}`)
      .send({ title: 'UPDATED TITLE' })
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    const deleted = await request(baseURL)
      .delete(`/groups/${updated.body.id}`)
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    const updatedList = await request(baseURL)
      .get('/groups')
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    expect(list.body.length > 0).toBe(true);
    expect(list.statusCode).toBe(200);
    expect(gotById.statusCode).toBe(200);
    expect(gotById.body.id === created.body.id).toBe(true);
    expect(created.statusCode).toBe(200);
    expect(updated.body.title !== newGroup.title).toBe(true);
    expect(updated.statusCode).toBe(200);
    expect(deleted.statusCode).toBe(200);
    expect(updatedList.body.length === 0).toBe(true);
  });
});
