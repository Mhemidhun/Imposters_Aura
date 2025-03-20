import { IProducts } from "../../models/products.model";
import { ICategory } from "../../models/category.model"
import { categoryInput, productInput } from "../../types/productTypes";

export interface IProductServiceMethods {
    getProducts(): Promise<IProducts[]>
    addProduct(data: productInput): Promise<IProducts>
    editProduct(productId: string, data: productInput): Promise<IProducts>
    blockProduct(productId: string): Promise<IProducts>
    unBlockProduct(productId: string): Promise<IProducts>
}

export interface ICategoryServiceMethods {
    getCategories(): Promise<ICategory[]>
    addCategory(data: categoryInput): Promise<ICategory>
    editCategory(categoryId: string, data: categoryInput): Promise<ICategory>
    blockCategory(categoryId: string): Promise<ICategory>
    unBlockCategory(categoryId: string): Promise<ICategory>
}