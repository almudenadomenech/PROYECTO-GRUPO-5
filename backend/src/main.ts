import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder().setTitle("BACKEND").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.useGlobalPipes(new ValidationPipe({transform: true}));
 

  // Configurar carpeta para subida imágenes/archivos
  // http://localhost:3000/uploads/1f82d390-d902-4aed-ad23-d543f56f2433.png
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  
  await app.listen(3000);
}
bootstrap();
