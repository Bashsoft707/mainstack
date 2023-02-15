import { RequestHandler } from "express";
import { ProductService } from "../service/products";

export class ProductController {
  private productService: ProductService = new ProductService();
  constructor() {}

  public createProduct: RequestHandler = async (req, res, next) => {
    try {
      const product = await this.productService.createProduct(req.body);

      return res.status(201).json({ success: true, product });
    } catch (error) {
      next(error);
    }
  };

  getProducts: RequestHandler = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page as string);
      const products = await this.productService.queryProducts(page);

      return res
        .status(200)
        .json({ success: true, count: products.length, products });
    } catch (error) {
      next(error);
    }
  }; 

  getProduct: RequestHandler = async (req, res, next) => {
    try {
      const product = await this.productService.getProduct(req.params.id);
      return res.status(200).json({ success: true, product });
    } catch (error) {
      next(error);
    }
  };

  updateProduct: RequestHandler = async (req, res, next) => {
    try {
      const product = await this.productService.updateProduct(
        req.params.id,
        req.body
      );
      return res.status(200).json({ success: true, product });
    } catch (error) {
      next(error);
    }
  };

  deleteProduct: RequestHandler = async (req, res, next) => {
    try {
      await this.productService.deleteProduct(req.params.id);
      return res.status(200).json({ success: true, data: {} });
    } catch (error) {
      next(error);
    }
  };
}
