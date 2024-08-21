import { IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    readonly name: string;
  
    @IsString()
    @IsOptional()
    readonly description?: string;
  
    @IsMongoId()
    @IsOptional()
    readonly principalImage?: string;

    @IsMongoId()
    @IsOptional()
    readonly secondaryImage?: string;
}
