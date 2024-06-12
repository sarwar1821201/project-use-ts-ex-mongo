import { NextFunction } from 'express';

//const express = require('express')
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/students/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
const port = 5000;

/// parser
app.use(express.json());
app.use(cors());

  // application routes
   app.use('/api/v1', router);
  // app.use('/api/v1/users', UserRoutes );

const getAController= (req: Request, res: Response) => {
  const a=10;
  res.send(a);
}

app.get('/', getAController);

//console.log(process.cwd());
 
app.use(globalErrorHandler)

app.use(notFound)

export default app;
