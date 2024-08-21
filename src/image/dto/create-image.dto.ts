import { IsString } from 'class-validator';

export class CreateImageDto {
    @IsString()
    readonly filename: string;
  
    @IsString()
    readonly source: string;
}
