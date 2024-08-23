import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    alias?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    size?: string;

    @IsString()
    price?: string;

    @IsBoolean()
    @IsOptional()
    stockEnabled: boolean;

    @IsBoolean()
    @IsOptional()
    enabled: boolean;

    @IsMongoId()
    @IsOptional()
    image?: string;

    @IsArray()
    @IsMongoId({ each: true })
    @IsOptional()
    readonly categoryIds?: string[];
}
