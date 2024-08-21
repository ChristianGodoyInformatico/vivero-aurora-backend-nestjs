import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/schema/product.schema';
import { Model } from 'mongoose';
import { ProductCategory } from 'src/schema/product-category.schema';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(ProductCategory.name) private productCategoryModel: Model<ProductCategory>) { }

  async create(createProductDto: CreateProductDto) {
    return await this.productModel.create(createProductDto);
  }

  async findProductsByCategory(categoryId: string): Promise<Product[]> {
    const productCategories = await this.productCategoryModel.find({ category: categoryId }).exec();
    const productIds = productCategories.map(pc => pc.product);
    return this.productModel.find({ _id: { $in: productIds } }).populate('image').exec();
  }

  async findAll() {
    return this.productModel.find().populate('image').exec();
  }

  async findOne(id: string) {
    return this.productModel.findById(id).populate('image').exec();
  }

  async findOneAndIncrementViews(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      .populate('image')
      .exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findTopViewed(): Promise<Product[]> {
    return this.productModel.find().sort({ views: -1 }).limit(10).populate('image').exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
