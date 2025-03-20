import { Request, Response } from "express";
import { sendErrorResponse, sendResponse } from "../../utils/responseHandler";
import CategoryServices, { categoryServices } from "../../services/adminServices/category.services";

export default class CategoryController {
    private categoryServices: CategoryServices

    constructor(categoryServices: CategoryServices) {
        this.categoryServices = categoryServices
    }

    async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await this.categoryServices.getCategories()
            sendResponse({
                res,
                success: true,
                message: 'Categories Fetched Successfully',
                data: categories,
                statusCode: 200
            });
            return

        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

    async addCategory(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const addProduct = await this.categoryServices.addCategory(data)
            sendResponse({
                res,
                success: true,
                message: 'Category Added Successfully',
                data: addProduct,
                statusCode: 200
            });
            return

        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

    async editCategory(req: Request, res: Response): Promise<void> {
        try {
            const { catId } = req.params
            const data = req.body
            const editProduct = await this.categoryServices.editCategory(catId, data)
            sendResponse({
                res,
                success: true,
                message: 'Category Edited Successfully',
                data: editProduct,
                statusCode: 200
            });
            return

        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

}

export const categoryController = new CategoryController(categoryServices)