import { IProductServiceMethods } from "../../interface/serviceInterface/admin.interface"
import { IProducts } from "../../models/products.model"
import ProductRepository from "../../repositories/adminRepository/productRepository"
import { productInput } from "../../types/productTypes"



export default class ProductServices implements IProductServiceMethods {
    private productRepository: ProductRepository

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }
    async addProduct(data: productInput): Promise<IProducts> {
        try {
            const addProduct = await this.productRepository.addProduct(data)
            return addProduct
        } catch (error: unknown) {
            throw error
        }
    }

}

const productRepository = new ProductRepository()
export const productServices = new ProductServices(productRepository)
