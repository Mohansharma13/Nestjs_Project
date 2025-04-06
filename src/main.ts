import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // localhost:3000/api/...
  app.enableCors();   // enable CORS for all routes
  await app.listen(process.env.PORT ?? 3000); //port 3000
}
bootstrap();
