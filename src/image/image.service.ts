import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from '../schema/image.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async create(createImageDto: CreateImageDto): Promise<Image> {
    const createdImage = new this.imageModel(createImageDto);
    return createdImage.save();
  }

  async findAll(): Promise<Image[]> {
    return this.imageModel.find().exec();
  }

  async findOne(id: string): Promise<Image> {
    return this.imageModel.findById(id).exec();
  }

  update(id: string, updateImageDto: UpdateImageDto) {
    return this.imageModel.findByIdAndUpdate(id, updateImageDto);
  }
 
  async remove(id: string): Promise<Image> {
    const image = await this.imageModel.findById(id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    const filePath = path.join(__dirname, '../../', image.path);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Failed to delete file:', err);
      }
    });
    return await this.imageModel.findByIdAndDelete(id);
  }

  async saveFileData(file: Express.Multer.File): Promise<Image> {
    const createdImage = new this.imageModel({
      originalName: file.originalname,
      fileName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
    });
    return createdImage.save();
  }

}
