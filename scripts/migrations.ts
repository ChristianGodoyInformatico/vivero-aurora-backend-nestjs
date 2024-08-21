import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schema/category.schema';

async function migrate() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const categoryModel = app.get<Model<CategoryDocument>>('CategoryModel');

  // Actualiza los documentos existentes
  await categoryModel.updateMany({}, {
    $set: {
      principalImage: null, // Asigna valores por defecto si es necesario
      secondaryImage: null, // Asigna valores por defecto si es necesario
    }
  });

  await app.close();
}

migrate().catch(err => console.error(err));