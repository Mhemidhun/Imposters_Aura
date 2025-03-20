import { ICategoryServiceMethods } from "../../interface/serviceInterface/admin.interface"
import { ICategory } from "../../models/category.model"
import CategoryRepository from "../../repositories/adminRepository/categoryRepository"
import { categoryInput } from "../../types/productTypes"


export default class CategoryServices implements ICategoryServiceMethods {
    private categoryRepository: CategoryRepository

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository
    }
    async getCategories(): Promise<ICategory[]> {
        try {
            const categories = await this.categoryRepository.getCategories()
            return categories
        } catch (error) {
            throw error
        }
    }

    async addCategory(data: categoryInput): Promise<ICategory> {
        try {
            const addProduct = await this.categoryRepository.addCategory(data)
            return addProduct
        } catch (error: unknown) {
            throw error
        }
    }

    async editCategory(categoryId: string, data: categoryInput): Promise<ICategory> {
        try {
            const updatedProduct = await this.categoryRepository.editCategory(categoryId, data);
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }
    async blockCategory(categoryId: string): Promise<ICategory> {
        try {
            const updatedProduct = await this.categoryRepository.blockCategory(categoryId);
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }
    async unBlockCategory(categoryId: string): Promise<ICategory> {
        try {
            const updatedProduct = await this.categoryRepository.unBlockCategory(categoryId);
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }
}

const categoryRepository = new CategoryRepository()
export const categoryServices = new CategoryServices(categoryRepository)
