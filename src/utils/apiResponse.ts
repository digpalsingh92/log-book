import { Response } from 'express';
import { ApiResponse } from '../types';

export class ApiResponseHelper {
  public static success<T>(
    res: Response,
    data: T,
    message = 'Request successful',
    statusCode = 200
  ): Response {
    const payload: ApiResponse<T> = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(payload);
  }

  public static error(
    res: Response,
    message = 'An error occurred',
    statusCode = 500,
    error?: string | Record<string, unknown>
  ): Response {
    const payload: ApiResponse = {
      success: false,
      message,
      error,
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(payload);
  }
}
