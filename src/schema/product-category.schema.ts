import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.schema';
import { Category } from './category.schema';

@Schema()
export class ProductCategory extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category;
}

export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);
