import { afterAll, beforeAll, describe, expect, it, test } from '@jest/globals';
import { baseURL, newUser, user } from './config';
const request = require('supertest');

const newTodo = {
  title: 'test',
  isDone: false,
};

const newSubTask = {
  title: 'test subtask',
  isDone: false,
};

describe('sub-tasks', () => {
  let cookies: string[] = [];
  let accessToken = '';
  let todoId = '';

  beforeAll(async () => {
    await request(baseURL).post('/user/register').send(newUser);
    const authed = await request(baseURL).post('/user/login').send(user);
    cookies = authed.headers['set-cookie'];
    accessToken = authed.body.accessToken;
    const createdTodo = await request(baseURL)
      .post('/todos')
      .send(newTodo)
      .set('Authorization', accessToken)
      .set('Cookie', cookies);
    const { id } = createdTodo.body;
    todoId = id;
  });
  afterAll(async () => {
    await request(baseURL)
      .delete(`/todos/${todoId}`)
      .set('Authorization', accessToken)
      .set('Cookie', cookies);
    await request(baseURL)
      .get(`/user/logOut`)
      .set('Authorization', accessToken)
      .set('Cookie', cookies);
  });

  it('initial state should be 0 and status 200', async () => {
    const response = await request(baseURL)
      .get('/sub-tasks')
      .set('Authorization', accessToken)
      .set('Cookie', cookies);
    expect(response.body.length === 0).toBe(true);
    expect(response.statusCode).toBe(200);
  });

  it('POST | DELETE | UPDATE /sub-tasks', async () => {
    const created = await request(baseURL)
      .post('/sub-tasks')
      .send({ ...newSubTask, todoId })
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    expect(created.statusCode).toBe(200);

    const gotById = await request(baseURL)
      .get(`/sub-tasks/${created.body.id}`)
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    expect(gotById.statusCode).toBe(200);
    expect(gotById.body.id === created.body.id).toBe(true);

    const list = await request(baseURL)
      .get('/sub-tasks')
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    expect(list.statusCode).toBe(200);
    expect(list.body.length > 0).toBe(true);

    const updated = await request(baseURL)
      .put(`/sub-tasks/${created.body.id}`)
      .send({ title: 'UPDATED TITLE' })
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    expect(updated.body.title !== newSubTask.title).toBe(true);
    expect(updated.statusCode).toBe(200);

    const deleted = await request(baseURL)
      .delete(`/sub-tasks/${updated.body.id}`)
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    expect(deleted.statusCode).toBe(200);

    const updatedList = await request(baseURL)
      .get('/sub-tasks')
      .set('Authorization', accessToken)
      .set('Cookie', cookies);

    expect(updatedList.body.length === 0).toBe(true);
  });
});
