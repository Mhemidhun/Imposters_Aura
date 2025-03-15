import { Router } from 'express'
import { adminAuthController } from '../controllers/adminController/auth.controller'
import { productController } from '../controllers/adminController/product.controller'

const router = Router()

router.post('/admin/login', adminAuthController.adminLogin.bind(adminAuthController))

//Products Route
router.get('/get/products', productController.getProducts.bind(productController))
router.post('/add/product', productController.addProduct.bind(productController))
router.patch('/edit/product/:prodId', productController.editProduct.bind(productController))
router.patch('products/:prodId/block', productController.blockProduct.bind(productController))
router.patch('products/:prodId/unblock', productController.UnBlockProduct.bind(productController))

export const adminRouter = router