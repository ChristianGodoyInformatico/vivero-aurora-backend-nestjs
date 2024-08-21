import { ArrayMinSize, ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly product: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  readonly category: string[];
}