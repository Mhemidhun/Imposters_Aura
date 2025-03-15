import { IProductServiceMethods } from "../../interface/serviceInterface/admin.interface"
import { IProducts } from "../../models/products.model"
import ProductRepository from "../../repositories/adminRepository/productRepository"
import { productInput } from "../../types/productTypes"



export default class ProductServices implements IProductServiceMethods {
    private productRepository: ProductRepository

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }
    async getProducts(): Promise<IProducts[]> {
        try {
            const products = await this.productRepository.getProducts()
            return products
        } catch (error) {
            throw error
        }
    }

    async addProduct(data: productInput): Promise<IProducts> {
        try {
            const addProduct = await this.productRepository.addProduct(data)
            return addProduct
        } catch (error: unknown) {
            throw error
        }
    }

    async editProduct(productId: string, data: productInput): Promise<IProducts> {
        try {
            const updatedProduct = await this.productRepository.editProduct(productId, data);
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    async blockProduct(productId: string): Promise<IProducts> {
        try {
            const updatedProduct = await this.productRepository.blockProduct(productId);
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    async unBlockProduct(productId: string): Promise<IProducts> {
        try {
            const updatedProduct = await this.productRepository.unBlockProduct(productId);
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

}

const productRepository = new ProductRepository()
export const productServices = new ProductServices(productRepository)
