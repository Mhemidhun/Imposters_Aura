import { IProducts } from "../../models/products.model";
import { productInput } from "../../types/productTypes";

export interface IProductServiceMethods {
    getProducts(): Promise<IProducts[]>
    addProduct(data: productInput): Promise<IProducts>
    editProduct(productId: string, data: productInput): Promise<IProducts>
    blockProduct(productId: string): Promise<IProducts>
    unBlockProduct(productId: string): Promise<IProducts>
}
