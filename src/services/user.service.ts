import { UserModel } from '../models/user.model';
import { CreateUserInput, UpdateUserInput, User } from '../types';

export class UserService {
  public async getAllUsers(): Promise<User[]> {
    return UserModel.findAll();
  }

  public async getUserById(id: string): Promise<User | null> {
    return UserModel.findById(id);
  }

  public async createUser(input: CreateUserInput): Promise<User> {
    const existing = await UserModel.findByEmail(input.email);
    if (existing) {
      throw new Error(`User with email "${input.email}" already exists`);
    }
    return UserModel.create(input);
  }

  public async updateUser(id: string, input: UpdateUserInput): Promise<User | null> {
    return UserModel.update(id, input);
  }

  public async deleteUser(id: string): Promise<boolean> {
    return UserModel.delete(id);
  }
}

export const userService = new UserService();
