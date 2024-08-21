import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { Category } from 'src/schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {

  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    console.log('Create Category DTO:', createCategoryDto); // Log de depuración
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
    return await this.categoryModel.findByIdAndDelete(id);
  }
}
