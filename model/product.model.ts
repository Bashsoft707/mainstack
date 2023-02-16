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
  },
  { timestamps: true, strictQuery: true, strict: true }
);

export const Product = model<IProduct & Document>("Product", ProductSchema);
