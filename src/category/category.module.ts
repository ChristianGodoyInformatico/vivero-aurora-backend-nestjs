import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schema/category.schema';
import { Image, ImageSchema } from 'src/schema/image.schema';
import { ProductCategory, ProductCategorySchema } from 'src/schema/product-category.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Category.name,
      schema: CategorySchema
    },
    {
      name: Image.name,
      schema: ImageSchema
    },
    {
      name: ProductCategory.name,
      schema: ProductCategorySchema
    }
  ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
