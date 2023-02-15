import { Router } from "express";
import { ProductController } from "../controller/products";

export class ProductRoute {
  public router: Router;
  private productController: ProductController = new ProductController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  protected routes() {
    this.router
      .route("/")
      .get(this.productController.getProducts)
      .post(this.productController.createProduct);
      
    this.router
      .route("/:id")
      .get(this.productController.getProduct)
      .patch(this.productController.updateProduct)
      .delete(this.productController.deleteProduct);
  }
}
