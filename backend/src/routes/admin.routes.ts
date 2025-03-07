import {Router} from 'express'
import { adminAuthController } from '../controllers/adminController/auth.controller'

const router = Router()

router.post('/admin/login', adminAuthController.adminLogin.bind(adminAuthController))

//Products Route
router.post('/add/product')


export const adminRouter = router