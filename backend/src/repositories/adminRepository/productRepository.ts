import mongoose from "mongoose";
import { IProductMethods } from "../../interface/repositoryInterface/admin.interface";
import { IProducts, ProductModel } from "../../models/products.model";
import { productInput } from "../../types/productTypes";
import BaseRepository from "../base.repository";

export default class ProductRepository extends BaseRepository<{
    Product: IProducts
}> implements IProductMethods {
    constructor() {
        super({
            Product: ProductModel
        })
    }
    async getProducts(): Promise<IProducts[]> {
        try {
            const products = await this.findAll("Product", { isBlocked: false })
            return products
        } catch (error) {
            throw error
        }
    }

    async addProduct(data: productInput): Promise<IProducts> {
        try {
            const newData: any = {
                productName: data.productName,
                categoryId: new mongoose.Types.ObjectId(data.categoryId),
                productPrice: data.productPrice,
                productColour: data.productColour,
                productSize: data.productSize,
                productDescription: data.productDescription,
                productImages: data.productImages,
            }
            const addProduct = await this.createData('Product', newData as unknown as Partial<IProducts>);
            return addProduct
        } catch (error: unknown) {
            throw error
        }
    }

    async editProduct(productId: string, data: Partial<productInput>): Promise<IProducts> {
        try {
            const existingProduct = await this.findById("Product", productId);
            if (!existingProduct) {
                throw new Error("Product not found");
            }
            const updatedProduct = await this.updateById(
                "Product",
                productId,
                data
            );

            if (!updatedProduct) {
                throw new Error("Failed to update product");
            }

            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    async blockProduct(productId: string): Promise<IProducts> {
        try {
            const existingProduct = await this.findById("Product", productId);
            if (!existingProduct) {
                throw new Error("Product not found");
            }
            const updatedProduct = await this.updateById(
                "Product",
                productId,
                { isBlocked: true }
            );

            if (!updatedProduct) {
                throw new Error("Failed to update product");
            }

            return updatedProduct;

        } catch (error) {
            throw error;
        }
    }

    async unBlockProduct(productId: string): Promise<IProducts> {
        try {
            const existingProduct = await this.findById("Product", productId);
            if (!existingProduct) {
                throw new Error("Product not found");
            }
            const updatedProduct = await this.updateById(
                "Product",
                productId,
                { isBlocked: false }
            );

            if (!updatedProduct) {
                throw new Error("Failed to update product");
            }

            return updatedProduct;
        } catch (error) {
            throw error
        }
    }

}