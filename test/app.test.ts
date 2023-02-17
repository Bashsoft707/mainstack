import request from "supertest";
import mongoose from "mongoose";
import { App } from "../config/app.config";
import { ProductRoute } from "../routes/product.routes";
import { CreateProductDto } from "../dto/create-product.dto";

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe("Testing Products", () => {
  const { app } = new App();
  it("Get all products", async () => {
    const { app } = new App();

    const productRoute = new ProductRoute();
    const products = productRoute.productController.productService.products;

    products.find = jest.fn().mockReturnValue([
      {
        _id: "63ef6036808f7da0736a1100",
        name: "Rec",
        description: "desc",
        price: 30,
        imageUrl:
          "https://res.cloudinary.com/orbtech-professional-services/image/upload/v1676632118/products/bc0fa0200b460438725ad468ec87d509_kxdm7i.jpg",
        cloudinaryId: "products/bc0fa0200b460438725ad468ec87d509_kxdm7i",
        createdAt: "2023-02-17T11:08:38.516Z",
        updatedAt: "2023-02-17T11:08:38.516Z",
        __v: 0,
      },
      {
        _id: "63ef6100518376963698008e",
        name: "Rec",
        description: "desc",
        price: 30,
        imageUrl:
          "https://res.cloudinary.com/orbtech-professional-services/image/upload/v1676632320/products/4637043e3da660e1c9111ac91aeedf25_mjguj3.jpg",
        cloudinaryId: "products/4637043e3da660e1c9111ac91aeedf25_mjguj3",
        createdAt: "2023-02-17T11:12:00.046Z",
        updatedAt: "2023-02-17T11:12:00.046Z",
        __v: 0,
      },
      {
        _id: "63ef6bb434015c22c32c2b97",
        name: "Rec",
        description: "desc",
        price: 30,
        imageUrl:
          "https://res.cloudinary.com/orbtech-professional-services/image/upload/v1676635061/products/00ed2b2ce484c27b5c58bd9767174b5f_yfx0uu.jpg",
        cloudinaryId: "products/00ed2b2ce484c27b5c58bd9767174b5f_yfx0uu",
        createdAt: "2023-02-17T11:57:40.913Z",
        updatedAt: "2023-02-17T11:57:40.913Z",
        __v: 0,
      },
    ]);

    mongoose.connect = jest.fn();
    return request(app).get("/product").expect(200);
  });

  it("Get a single product", async () => {
    const userId = "63ef6036808f7da0736a1100";

    const productRoute = new ProductRoute();
    const products = productRoute.productController.productService.products;

    products.findById = jest.fn().mockReturnValue([
      {
        _id: "63ef6036808f7da0736a1100",
        name: "Rec",
        description: "desc",
        price: 30,
        imageUrl:
          "https://res.cloudinary.com/orbtech-professional-services/image/upload/v1676632118/products/bc0fa0200b460438725ad468ec87d509_kxdm7i.jpg",
        cloudinaryId: "products/bc0fa0200b460438725ad468ec87d509_kxdm7i",
        createdAt: "2023-02-17T11:08:38.516Z",
        updatedAt: "2023-02-17T11:08:38.516Z",
        __v: 0,
      },
    ]);

    mongoose.connect = jest.fn();
    return request(app).get(`/product/${userId}`).expect(200);
  });

  it("Create a product", async () => {
    const productData: CreateProductDto = {
      name: "Prod",
      description: "prod desc",
      price: 10,
      imageUrl:
        "https://res.cloudinary.com/orbtech-professional-services/image/upload/v1676632118/products/bc0fa0200b460438725ad468ec87d509_kxdm7i.jpg",
      cloudinaryId: "products/bc0fa0200b460438725ad468ec87d509_kxdm7i",
    };

    const productRoute = new ProductRoute();
    const products = productRoute.productController.productService.products;

    products.findOne = jest.fn().mockReturnValue(null);
    products.create = jest.fn().mockReturnValue({
      _id: "product1",
      name: "Prod",
      description: "prod desc",
      price: 10,
      imageUrl:
        "https://res.cloudinary.com/orbtech-professional-services/image/upload/v1676632118/products/bc0fa0200b460438725ad468ec87d509_kxdm7i.jpg",
      cloudinaryId: "products/bc0fa0200b460438725ad468ec87d509_kxdm7i",
      createdAt: "2023-02-17T11:08:38.516Z",
      updatedAt: "2023-02-17T11:08:38.516Z",
      __v: 0,
    });

    mongoose.connect = jest.fn();
    return request(app).post("/product").send(productData).expect(201);
  });
});
