import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ImageModule } from './image/image.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductModule,
    UserModule,
    CategoryModule,
    ImageModule,
    ProductCategoryModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/ViveroDB'),
  ],
})
export class AppModule {}
