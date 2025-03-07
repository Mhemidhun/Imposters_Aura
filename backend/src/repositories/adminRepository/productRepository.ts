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
}