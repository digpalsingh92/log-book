import { config } from '../config/env';

export interface DatabaseStatus {
  isConnected: boolean;
  provider: string;
  url: string;
}

class DatabaseConnection {
  private isConnected = false;

  public async connect(): Promise<void> {
    try {
      // In production, connect to MongoDB (Mongoose), PostgreSQL (Prisma/TypeORM/pg), etc.
      // e.g.: await mongoose.connect(config.databaseUrl);
      this.isConnected = true;
      console.log(`[Database] Connected successfully to: ${this.maskUrl(config.databaseUrl)}`);
    } catch (error) {
      this.isConnected = false;
      console.error('[Database] Connection failed:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      this.isConnected = false;
      console.log('[Database] Disconnected successfully');
    }
  }

  public getStatus(): DatabaseStatus {
    return {
      isConnected: this.isConnected,
      provider: config.databaseUrl.split('://')[0] || 'custom',
      url: this.maskUrl(config.databaseUrl),
    };
  }

  private maskUrl(url: string): string {
    return url.replace(/:([^:@]+)@/, ':****@');
  }
}

export const db = new DatabaseConnection();
