import { Product } from "../model/Product";
import { ApiError } from "../utils/apiError";
import { responseStatusCodes } from "../utils/types";

export class ProductService {
  constructor() {}

  public async createProduct(data: any) {
    const { name, description, amount } = data;

    if (!name || !description || !amount) {
      throw new ApiError({
        message: "Missing required parameters",
        statusCode: responseStatusCodes.BAD_REQUEST,
      });
    }

    const product = await Product.create({
      name,
      description,
      amount,
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
        statusCode: responseStatusCodes.NOT_FOUND,
      });
    }

    return product;
  }

  async updateProduct(id: string, data: any) {
    await this.getProduct(id);

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    return product;
  }

  async deleteProduct(id: string) {
    await this.getProduct(id);

    await Product.findByIdAndDelete(id);
  }
}
