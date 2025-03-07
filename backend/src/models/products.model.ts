import mongoose, { model, Schema, Document } from "mongoose";

interface IImages {
    url: string;
}

export interface IProducts extends Document {
    productName: string;
    categoryId: Schema.Types.ObjectId;
    productPrice: number;
    productColour: string;
    productSize: string;
    productDescription: string;
    productImages: IImages[];
}

const productSchema = new Schema<IProducts>(
    {
        productName: { type: String, required: true },
        categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
        productPrice: { type: Number, required: true },
        productColour: { type: String, required: true },
        productSize: { type: String, required: true },
        productDescription: { type: String, required: true },
        productImages: [{ url: { type: String, required: true } }],
    },
    {
        timestamps: true
    }
);

export const ProductModel = model<IProducts>('products', productSchema);
