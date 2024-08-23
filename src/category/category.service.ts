import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { Category } from 'src/schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProductCategory } from 'src/schema/product-category.schema';

@Injectable()
export class CategoryService {

  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>,
  @InjectModel(ProductCategory.name) private productCategoryModel: Model<ProductCategory>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll() {
    return this.categoryModel.find().populate('principalImage').populate('secondaryImage').exec();
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id).populate('principalImage').populate('secondaryImage').exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  async remove(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id).exec();

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.productCategoryModel.deleteMany({ category: id }).exec();

    return category;
  }
}
