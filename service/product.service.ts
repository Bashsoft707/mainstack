import { CreateProductDto } from "../dto/create-product.dto";
import { IResponseStatusCodes } from "../interfaces/response.interface";
import { Product } from "../model/product.model";
import { ApiError } from "../utils/api-error.utils";

export class ProductService {
  constructor() {}

  public async createProduct(data: CreateProductDto) {
    const { name, description, price } = data;

    if (!name || !description || !price) {
      throw new ApiError({
        message: "Missing required parameters",
        statusCode: IResponseStatusCodes.BAD_REQUEST,
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
    });

    return product;
  }

  async queryProducts(page: number) {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const products = await Product.find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize);

    return products;
  }

  async getProduct(id: string) {
    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError({
        message: `Product with id ${id} not found`,
        statusCode: IResponseStatusCodes.NOT_FOUND,
      });
    }

    return product;
  }

  async updateProduct(id: string, data: Partial<CreateProductDto>) {
    await this.getProduct(id);

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    return product;
  }

  async deleteProduct(id: string) {
    await this.getProduct(id);

    await Product.findByIdAndDelete(id);
  }
}
