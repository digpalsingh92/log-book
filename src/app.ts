import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env';
import apiRoutes from './routes';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler';

const createApp = (): Application => {
  const app: Application = express();

  // Security and core middleware
  app.use(helmet());
  app.use(cors({ origin: config.corsOrigin }));
  app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Root welcome route
  app.get('/', (req: Request, res: Response) => {
    res.json({
      name: 'TypeScript + Node.js API',
      version: '1.0.0',
      status: 'active',
      endpoints: {
        health: '/api/v1/health',
        users: '/api/v1/users',
      },
    });
  });

  // API router
  app.use('/api/v1', apiRoutes);

  // Error handling middleware
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
