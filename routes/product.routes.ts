import { Router } from "express";
import { ProductController } from "../controller/products.controller";
import { upload } from "../utils/upload.utils";

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
      .post(upload.single("imageUrl"), this.productController.createProduct);
      
    this.router
      .route("/:id")
      .get(this.productController.getProduct)
      .patch(upload.single("imageUrl"), this.productController.updateProduct)
      .delete(this.productController.deleteProduct);
  }
}
