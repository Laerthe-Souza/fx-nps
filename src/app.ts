require('dotenv').config();

import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import createConnection from './database/connection';

import routes from './routes';
import AppError from './errors/AppError';

createConnection();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err.message);

  return response.status(500).json({
    status: 'error',
    message: 'Erro interno no servidor',
  });
});

export default app;