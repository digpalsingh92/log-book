import { User, CreateUserInput, UpdateUserInput } from '../types';

export class UserModel {
  // In-memory data store for demonstration and local testing
  private static users: User[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  public static async findAll(): Promise<User[]> {
    return this.users;
  }

  public static async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }

  public static async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
  }

  public static async create(input: CreateUserInput): Promise<User> {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  public static async update(id: string, input: UpdateUserInput): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    this.users[index] = {
      ...this.users[index],
      ...input,
      updatedAt: new Date(),
    };
    return this.users[index];
  }

  public static async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}
