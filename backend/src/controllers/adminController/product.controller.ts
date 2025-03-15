import { Request, Response } from "express";
import ProductServices, { productServices } from "../../services/adminServices/product.services";
import { sendErrorResponse, sendResponse } from "../../utils/responseHandler";

export default class ProductController {
    private productServices: ProductServices

    constructor(productServices: ProductServices) {
        this.productServices = productServices
    }

    async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productServices.getProducts()
            sendResponse({
                res,
                success: true,
                message: 'Products Fetched Successfully',
                data: products,
                statusCode: 200
            });
            return
        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
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

        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

    //Edit Product
    async editProduct(req: Request, res: Response): Promise<void> {
        try {
            const { prodId } = req.params
            const data = req.body
            const editProduct = await this.productServices.editProduct(prodId, data)
            sendResponse({
                res,
                success: true,
                message: 'Product Edited Successfully',
                data: editProduct,
                statusCode: 200
            });
            return

        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

    async blockProduct(req: Request, res: Response) {
        try {
            const { prodId } = req.params
            const editProduct = await this.productServices.blockProduct(prodId)
            sendResponse({
                res,
                success: true,
                message: 'Product Blocked Successfully',
                data: editProduct,
                statusCode: 200
            });
            return
        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

    async UnBlockProduct(req: Request, res: Response) {
        try {
            const { prodId } = req.params
            const editProduct = await this.productServices.unBlockProduct(prodId)
            sendResponse({
                res,
                success: true,
                message: 'Product Unblocked Successfully',
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

export const productController = new ProductController(productServices)