import { Router } from 'express'
import { adminAuthController } from '../controllers/adminController/auth.controller'
import { productController } from '../controllers/adminController/product.controller'
import { categoryController } from "../controllers/adminController/category.controller"

const router = Router()

router.post('/admin/login', adminAuthController.adminLogin.bind(adminAuthController))

//Products Route
router.get('/get/products', productController.getProducts.bind(productController))
router.post('/add/product', productController.addProduct.bind(productController))
router.patch('/edit/product/:prodId', productController.editProduct.bind(productController))
router.patch('products/:prodId/block', productController.blockProduct.bind(productController))
router.patch('products/:prodId/unblock', productController.UnBlockProduct.bind(productController))

//Category Route
router.get('/get/categories', categoryController.getCategories.bind(categoryController))
router.post('/add/category', categoryController.addCategory.bind(categoryController))
router.patch('/edit/category/:catId', categoryController.editCategory.bind(categoryController))

export const adminRouter = router