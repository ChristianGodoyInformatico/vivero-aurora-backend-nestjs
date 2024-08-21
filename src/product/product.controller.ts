import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get()
  findList() {
    return this.productService.findAll();
  }

  @Get('top/views')
  async findTopViewed() {
    return this.productService.findTopViewed();
  }

  @Get('/by-category/:id')
  async findProductsByCategory(@Param('id') id: string) {
    return await this.productService.findProductsByCategory(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOneAndIncrementViews(id);
  }

  @Put(':id')
  update(@Param('id') id: string, 
  @Body() updateProductDto: UpdateProductDto) {
    console.log('llego la consulta de edicion');
    console.log('los datos son:', updateProductDto);

    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
