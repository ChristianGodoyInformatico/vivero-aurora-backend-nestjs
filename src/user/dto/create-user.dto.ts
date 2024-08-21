import { IsString, IsEmail, MinLength, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsBoolean()
  @IsOptional()
  readonly enabled?: boolean;
}