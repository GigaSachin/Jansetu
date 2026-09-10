import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(): express.Application {
  const app = express();

  // Middleware
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
  }));

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Static uploads directory
  const uploadsDir = path.join(__dirname, '../uploads');
  app.use('/uploads', express.static(uploadsDir));

  // Mount API Gateway routes
  app.use('/api', routes);
  app.use('/api/v1', routes);

  // Root welcome
  app.get('/', (req, res) => {
    res.json({
      name: 'JanSetu API Gateway',
      version: '4.0.0',
      description: 'Phase 4 Node.js Express Backend for JanSetu Platform',
      endpoints: {
        auth: '/api/auth',
        problems: '/api/problems',
        institutions: '/api/institutions',
        government: '/api/government',
        university: '/api/university',
        csr: '/api/csr',
        health: '/api/health'
      }
    });
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
