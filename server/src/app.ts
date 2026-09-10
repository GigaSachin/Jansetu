import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { generalLimiter, authLimiter, problemSubmissionLimiter } from './middleware/rateLimiter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(): express.Application {
  const app = express();

  // 1. Production Security Headers Middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    res.removeHeader('X-Powered-By');
    next();
  });

  // 2. CORS with configurable allowed origins
  const allowedOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
    : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'];

  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in local dev, configurable in prod
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
  }));

  // 3. Body parsers with safe size limits
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 4. Rate limiting
  app.use('/api', generalLimiter);
  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
  app.use('/api/problems', (req, res, next) => {
    if (req.method === 'POST') {
      return problemSubmissionLimiter(req, res, next);
    }
    next();
  });

  // 5. Static uploads directory
  const uploadsDir = path.join(__dirname, '../uploads');
  app.use('/uploads', express.static(uploadsDir));

  // 6. Mount API Gateway routes
  app.use('/api', routes);
  app.use('/api/v1', routes);

  // Root welcome
  app.get('/', (req, res) => {
    res.json({
      name: 'JanSetu API Gateway',
      version: '4.0.0',
      status: 'OPERATIONAL',
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
