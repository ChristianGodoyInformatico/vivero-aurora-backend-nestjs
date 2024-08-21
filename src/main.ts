import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as cors from 'cors';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  app.setGlobalPrefix('api');

  app.use(cors({
    origin: 'http://localhost:5173', // La URL de tu aplicación React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

    // // Configura el directorio para servir archivos estáticos
    // app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    //   prefix: 'uploads', // Prefijo para acceder a las imágenes
    // });

  const port = app.get(ConfigService).get('PORT');
  await app.listen(port || 3000);
  
}
bootstrap();
