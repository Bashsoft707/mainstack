import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  // Cloudinary id to track image in cloudinary database
  cloudinaryId: string;
}
