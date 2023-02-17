import { model, Schema, Document } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      required: String,
      type: String
    },
    cloudinaryId: {
      type: String
    },
  },
  { timestamps: true, strictQuery: true, strict: true }
);

export const Product = model<IProduct & Document>("Product", ProductSchema);
