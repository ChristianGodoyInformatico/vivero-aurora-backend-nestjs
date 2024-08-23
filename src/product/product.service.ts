import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'src/schema/product.schema';
import { Model } from 'mongoose';
import { ProductCategory } from 'src/schema/product-category.schema';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(ProductCategory.name) private productCategoryModel: Model<ProductCategory>) { }

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    const savedProduct: any = await createdProduct.save();

    // Asocia el producto con las categorías
    if (createProductDto.categoryIds && createProductDto.categoryIds.length > 0) {
      await this.associateCategories(savedProduct._id, createProductDto.categoryIds);
    }

    return savedProduct;
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

    // Encuentra las asociaciones en la colección intermedia productcategories
    const productCategories = await this.productCategoryModel.find({ product: id })
      .exec();

    // Combina el producto con las asociaciones
    const response = {
      ...product.toObject(), // Convierte el documento de Mongoose a un objeto plano
      categoryIds: productCategories.map(pc => pc.category), // Solo devuelve las categorías asociadas
    };

    return response;
  }

  async findTopViewed(): Promise<Product[]> {
    return this.productModel.find().sort({ views: -1 }).limit(10).populate('image').exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productModel.findById(id).exec();

    console.log('que llega en el updateProductoDto:', updateProductDto);

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    // Procesar las categorías si se proporciona el array categoryIds
    if (updateProductDto.categoryIds) {
      // Obtener las asociaciones actuales del producto en la colección intermedia
      const currentAssociations = await this.productCategoryModel.find({ product: id }).exec();
      const currentCategoryIds = currentAssociations.map(assoc => assoc.category.toString());

      // Filtrar las categorías que ya existen en las asociaciones actuales
      const categoriesToAdd = updateProductDto.categoryIds.filter(catId => !currentCategoryIds.includes(catId));

      // Filtrar las categorías que ya no están en el array de categoryIds proporcionado
      const categoriesToRemove = currentCategoryIds.filter(catId => !updateProductDto.categoryIds.includes(catId));

      // Eliminar las asociaciones que ya no existen en el array proporcionado
      if (categoriesToRemove.length > 0) {
        await this.productCategoryModel.deleteMany({
          product: id,
          category: { $in: categoriesToRemove }
        }).exec();
      }

      // Agregar las nuevas asociaciones
      if (categoriesToAdd.length > 0) {
        const newAssociations = categoriesToAdd.map(categoryId => ({
          product: id,
          category: categoryId,
        }));
        await this.productCategoryModel.insertMany(newAssociations);
      }
    }

    // Actualizar el producto
    const updatedProductData = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();

    return updatedProductData;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productCategoryModel.deleteMany({ product: id }).exec();

    return product;
  }

  private async associateCategories(productId: string, categoryIds: string[]) {
    const productCategories = categoryIds.map(categoryId => ({
      product: productId,
      category: categoryId,
    }));
    await this.productCategoryModel.insertMany(productCategories);
  }


}
