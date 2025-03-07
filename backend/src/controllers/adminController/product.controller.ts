import { Request, Response } from "express";
import ProductServices, { productServices } from "../../services/adminServices/product.services";
import { sendErrorResponse, sendResponse } from "../../utils/responseHandler";

export default class ProductController {
    private productServices: ProductServices

    constructor(productServices: ProductServices) {
        this.productServices = productServices
    }

    async addProduct(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const addProduct = await this.productServices.addProduct(data)
            sendResponse({
                res,
                success: true,
                message: 'Product Added Successfully',
                data: addProduct,
                statusCode: 200
            });
            return

        } catch (error: unknown) {
            sendErrorResponse(res, 'Internal Server Error', 500)
            return
        }
    }
}