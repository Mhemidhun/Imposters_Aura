import { IProducts } from "../../models/products.model";
import { productInput } from "../../types/productTypes";

export interface IProductMethods {
    addProduct(data: productInput): Promise<IProducts>
}