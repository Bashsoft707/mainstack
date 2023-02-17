import { CreateProductDto } from "../dto/create-product.dto";
import { IResponseStatusCodes } from "../interfaces/response.interface";
import { Product } from "../model/product.model";
import { ApiError } from "../utils/api-error.utils";
import cloudinary from "../utils/cloudinary.utils";

export class ProductService {
  constructor() {}

  public async createProduct(
    data: CreateProductDto,
    file: Express.Multer.File | undefined
  ) {
    try {
      const { name, description, price } = data;

      const upload = await cloudinary.uploader.upload(file?.path, {
        folder: "mission",
        use_filename: true,
      });

      const product = await Product.create({
        name,
        description,
        price,
        imageUrl: upload.secure_url,
        cloudinaryId: upload.public_id,
      });

      return product;
    } catch (err) {
      if (err instanceof Error) {
        throw new ApiError({
          message: err.message,
          statusCode: IResponseStatusCodes.BAD_REQUEST,
        });
      }
    }
  }

  async queryProducts(limit: number, skip: number) {
    const products = await Product.find({})
      .sort({ id: -1 })
      .skip(skip)
      .limit(limit);

    return products;
  }

  async getProduct(id: string) {
    try {
      const product = await Product.findById(id);

      if (!product) {
        throw new ApiError({
          message: `Product with id ${id} not found`,
          statusCode: IResponseStatusCodes.NOT_FOUND,
        });
      }

      return product;
    } catch (err) {
      if (err instanceof Error) {
        throw new ApiError({
          message: err.message,
          statusCode: IResponseStatusCodes.BAD_REQUEST,
        });
      }
    }
  }

  async updateProduct(
    id: string,
    data: Partial<CreateProductDto>,
    file: Express.Multer.File | undefined
  ) {
    try {
      const product = await this.getProduct(id);

      await cloudinary.uploader.destroy(product?.cloudinaryId);

      let uploadResult;
      if (file) {
        uploadResult = await cloudinary.uploader.upload(file?.path, {
          folder: "mission",
          use_filename: true,
        });
      }

      await Product.findByIdAndUpdate(
        id,
        {
          $set: {
            ...data,
            // imageUrl: uploadResult.secure_url,
            // cloudinaryId: uploadResult.public_id,
          },
        },
        { new: true }
      );

      return product;
    } catch (err) {
      if (err instanceof Error) {
        throw new ApiError({
          message: err.message,
          statusCode: IResponseStatusCodes.BAD_REQUEST,
        });
      }
    }
  }

  async deleteProduct(id: string) {
    try {
      await this.getProduct(id);

      await Product.findByIdAndDelete(id);
    } catch (err) {
      if (err instanceof Error) {
        throw new ApiError({
          message: err.message,
          statusCode: IResponseStatusCodes.BAD_REQUEST,
        });
      }
    }
  }
}
