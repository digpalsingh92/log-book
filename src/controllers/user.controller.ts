import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { ApiResponseHelper } from '../utils/apiResponse';
import { AppError } from '../middlewares/errorHandler';
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'user']).default('user'),
});

const UpdateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(['admin', 'user']).optional(),
});

export class UserController {
  public static async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      ApiResponseHelper.success(res, users, 'Users retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  public static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        throw new AppError(`User with ID ${id} not found`, 404);
      }

      ApiResponseHelper.success(res, user, 'User retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validation = CreateUserSchema.safeParse(req.body);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.error.flatten().fieldErrors,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const newUser = await userService.createUser(validation.data);
      ApiResponseHelper.success(res, newUser, 'User created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const validation = UpdateUserSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.error.flatten().fieldErrors,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const updatedUser = await userService.updateUser(id, validation.data);
      if (!updatedUser) {
        throw new AppError(`User with ID ${id} not found`, 404);
      }

      ApiResponseHelper.success(res, updatedUser, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  }

  public static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await userService.deleteUser(id);

      if (!deleted) {
        throw new AppError(`User with ID ${id} not found`, 404);
      }

      ApiResponseHelper.success(res, { id }, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
