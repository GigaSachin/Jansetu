import { createApp } from './app.js';
import { config } from './config/env.js';
import { repositoryFactory } from './repositories/RepositoryFactory.js';

async function bootstrap() {
  console.log('🚀 [JanSetu Backend]: Initializing services & repository layer...');
  await repositoryFactory.initialize();

  const app = createApp();
  const PORT = config.port;

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`✨ JanSetu Phase 4 Backend API Gateway Running!`);
    console.log(`🔗 Local URL:        http://localhost:${PORT}`);
    console.log(`🔗 API Base:         http://localhost:${PORT}/api`);
    console.log(`🤖 AI Engine Bridge: ${config.aiEngineUrl}`);
    console.log(`🌐 Frontend Origin:  ${config.frontendUrl}`);
    console.log(`=======================================================`);
  });

  // Graceful shutdown
  const handleShutdown = (signal: string) => {
    console.log(`\n🛑 [JanSetu Backend]: Received ${signal}. Closing server gracefully...`);
    server.close(() => {
      console.log('🏁 JanSetu Backend stopped cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}

bootstrap().catch((err) => {
  console.error('❌ Failed to start JanSetu Backend:', err);
  process.exit(1);
});
