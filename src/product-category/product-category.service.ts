import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from 'src/schema/product-category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductCategoryService {

  constructor(@InjectModel(ProductCategory.name) private productCategoryModel: Model<ProductCategory>) { }
  
  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const productCategories = createProductCategoryDto.category.map(categoryId => ({
      product: createProductCategoryDto.product,
      category: categoryId,
    }));
    return await this.productCategoryModel.insertMany(productCategories);
  }

  findAll() {
    return `This action returns all productCategory`;
  }

  findOne(id: string) {
    return `This action returns a #${id} productCategory`;
  }

  update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    return `This action updates a #${id} productCategory`;
  }

  async remove(id: string) {
    return await this.productCategoryModel.findByIdAndDelete(id);
  }
}
