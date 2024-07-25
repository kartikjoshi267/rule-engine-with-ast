require('express-async-errors');

import express, { NextFunction, Request, Response, Router } from 'express';
import ApiResponseBuilder from './utils/api-response-builder';
import CustomError from './utils/err/custom-error';
import connectToDB from './database/db';
import cors from 'cors';
import StatusCode from './enums/status-codes';
import logger from './utils/logger';
import NotFoundError from './utils/err/not-found-error';
import { FRONTEND_URL } from './config/config';
import { ruleAndAstRouter } from './router';
import initializeData from './init_script';

const app = express();
const corsOptions = {
  origin: FRONTEND_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
connectToDB();
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.json(new ApiResponseBuilder().message("Server is running 🚀🚀").build());
});

initializeData();

app.use('/api/v1/', ruleAndAstRouter);

app.use('*', (req: Request, res: Response) => {
  throw new NotFoundError("Route not found");
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.build());
  }
  
  logger.error(err);
  return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    error: "We are having some server issues. Please try again later.",
    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
  });
});

export default app;