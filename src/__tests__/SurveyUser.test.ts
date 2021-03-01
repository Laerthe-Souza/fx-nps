import request from 'supertest';
import { getConnection } from 'typeorm';

import createConnection from '../database/connection';
import app from '../app';

describe('SurveyUser', () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();

    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new survey user', async () => {
    await request(app).post('/users').send({
      name: 'User Example',
      email: 'user@example.com',
    });

    const survey = await request(app).post('/surveys').send({
      title: 'Title Example',
      description: 'Description Example',
    });

    const response = await request(app).post('/surveys/users').send({
      email: 'user@example.com',
      surveyId: survey.body.id,
    });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new survey user if user not exists', async () => {
    const response = await request(app).post('/surveys/users').send({
      email: 'user@example2.com',
      surveyId: 'surveyId example',
    });

    expect(response.status).toBe(400);
  });

  it('Should not be able to create a new survey user if survey not exists', async () => {
    const response = await request(app).post('/surveys/users').send({
      email: 'email@example2.com',
      surveyId: 'surveyId example',
    });

    expect(response.status).toBe(400);
  });

  it('Should be able to calculating a net promoter score of the surveys users', async () => {
    const survey = await request(app).post('/surveys').send({
      title: 'Title Example',
      description: 'Description Example',
    });

    const response = await request(app).get(
      `/surveys/users/nps/${survey.body.id}`,
    );

    expect(response.status).toBe(200);
  });
});
