import { Request, Response } from 'express';
import { ApiResponseHelper } from '../utils/apiResponse';
import { db } from '../db/connection';
import { config } from '../config/env';

export class HealthController {
  public static check(req: Request, res: Response): void {
    const healthData = {
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      database: db.getStatus(),
      memoryUsage: process.memoryUsage(),
    };

    ApiResponseHelper.success(res, healthData, 'Service is healthy');
  }
}
