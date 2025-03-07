import { IProducts } from "../../models/products.model";
import { productInput } from "../../types/productTypes";

export interface IProductServiceMethods {
    addProduct(data: productInput): Promise<IProducts>
}
