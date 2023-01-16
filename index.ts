import { json, raw, text } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import formData from 'express-form-data';
import fs from 'fs';
import { errorMiddleware } from 'middlewares';

import { ApplicationError } from 'errors';

import packageJson from './package.json';
import MasterRouter from '@routes';

process.title = packageJson.name;

const app = express();
app.use(json());
app.use(raw());
app.use(text());
app.use(cors());
app.use(express.json({ limit: '1000kb' }));
app.use(formData.parse());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

dotenv.config();

const port = process.env.PORT || 5000;
app.listen(port, (): void => console.log(`> Listening on port ${port}`));

app.use('/api', MasterRouter);
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Success', status: 200 });
});
app.use((data: ApplicationError, req: Request, res: any, next: NextFunction) => {
  return errorMiddleware.createResponse(res, data);
});
