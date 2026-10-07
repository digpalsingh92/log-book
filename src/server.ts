import createApp from './app';
import { config } from './config/env';
import { db } from './db/connection';
import http from 'http';

const startServer = async (): Promise<void> => {
  try {
    // 1. Initialize Database connection
    await db.connect();

    // 2. Initialize Express application
    const app = createApp();
    const server = http.createServer(app);

    // 3. Start listening
    server.listen(config.port, () => {
      console.log('==================================================');
      console.log(`🚀 Server ready at: http://localhost:${config.port}`);
      console.log(`📡 Environment: ${config.nodeEnv}`);
      console.log(`🩺 Health check: http://localhost:${config.port}/api/v1/health`);
      console.log(`👥 Users API:   http://localhost:${config.port}/api/v1/users`);
      console.log('==================================================');
    });

    // 4. Graceful shutdown handler
    const handleShutdown = async (signal: string) => {
      console.log(`\nReceived ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        console.log('HTTP server closed.');
        await db.disconnect();
        console.log('Database connection closed.');
        process.exit(0);
      });

      // Force shutdown after timeout if graceful fails
      setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
