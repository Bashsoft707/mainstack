import express, { Application } from "express"
import dotenv from "dotenv"
import connectDB from "./db";
import { ProductRoute } from "../routes/products";
import { globalErrorHandler } from "../middleware/globalErrorHandler";

// Load environment variables
dotenv.config();

export class App {
    app: Application
    private route: ProductRoute = new ProductRoute()

    constructor() {
        this.app = express()
        connectDB()
        this.config()
    }

    config() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use("/product", this.route.router)
        this.app.use(globalErrorHandler)
    }
}