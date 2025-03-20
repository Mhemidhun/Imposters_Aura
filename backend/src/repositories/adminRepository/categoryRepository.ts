import mongoose from "mongoose";
import { ICategoryMethods } from "../../interface/repositoryInterface/admin.interface"
import { ICategory, CategoryModel } from "../../models/category.model";
import { categoryInput } from "../../types/productTypes";
import BaseRepository from "../base.repository";


export default class CategoryRepository extends BaseRepository<{
    Category: ICategory
}> implements ICategoryMethods {
    constructor() {
        super({
            Category: CategoryModel
        })
    }
    async getCategories(): Promise<ICategory[]> {
        try {
            const products = await this.findAll("Category", { isBlocked: false })
            return products
        } catch (error) {
            throw error
        }
    }
    async addCategory(data: categoryInput): Promise<ICategory> {
        try {
            // Check if category already exists
            const existingCategory = await this.findOne("Category", { categoryName: data.categoryName });
            if (existingCategory) {
                throw new Error("Category already exists.");
            }

            const newData: categoryInput = {
                categoryName: data.categoryName,
                description: data.description
            }
            const addCategory = await this.createData("Category", newData as unknown as Partial<ICategory>);
            return addCategory
        } catch (error) {
            throw error
        }
    }

    async editCategory(categoryId: string, data: categoryInput): Promise<ICategory> {
        try {
            // Check if category exists
            const existingCategory = await this.findOne("Category", { _id: categoryId });
            if (!existingCategory) {
                throw new Error("Category not found.");
            }

            // Check if the new category name is already taken (excluding the current category)
            const duplicateCategory = await this.findOne("Category", {
                categoryName: data.categoryName,
                _id: { $ne: categoryId }
            });

            if (duplicateCategory) {
                throw new Error("Category name already in use.");
            }

            // Prepare updated data
            const updatedData: Partial<ICategory> = {
                categoryName: data.categoryName,
                description: data.description
            };

            // Update category
            // const updatedCategory = await this.updateData("Category", categoryId, updatedData);
            const updatedCategory = await this.updateById("Category", categoryId, updatedData)

            if (!updatedCategory) {
                throw new Error("Failed to update category.");
            }

            return updatedCategory;
        } catch (error) {
            throw new Error(`Failed to edit category: ${(error as Error).message}`);
        }
    }

    async blockCategory(categoryId: string): Promise<ICategory> {
        try {
            // Check if category exists
            const category = await this.findOne("Category", { _id: categoryId });
            if (!category) {
                throw new Error("Category not found.");
            }

            // Check if already blocked
            if (category.isBlocked) {
                throw new Error("Category is already blocked.");
            }

            // Update status to blocked
            const updatedCategory = await this.updateById("Category", categoryId, { isBlocked: true });

            if (!updatedCategory) {
                throw new Error("Failed to block category.");
            }

            return updatedCategory;
        } catch (error) {
            throw new Error(`Failed to block category: ${(error as Error).message}`);
        }
    }

    async unBlockCategory(categoryId: string): Promise<ICategory> {
        try {
            // Check if category exists
            const category = await this.findOne("Category", { _id: categoryId });
            if (!category) {
                throw new Error("Category not found.");
            }

            // Check if already blocked
            if (category.isBlocked) {
                throw new Error("Category is already blocked.");
            }

            // Update status to blocked
            const updatedCategory = await this.updateById("Category", categoryId, { isBlocked: false });

            if (!updatedCategory) {
                throw new Error("Failed to block category.");
            }

            return updatedCategory;
        } catch (error) {
            throw new Error(`Failed to block category: ${(error as Error).message}`);
        }
    }

}