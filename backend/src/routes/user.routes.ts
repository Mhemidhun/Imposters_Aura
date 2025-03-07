import { Router } from "express";
import { userAuthController } from '../controllers/userController/auth.controller'

const router = Router()

router.post('/user/signup', userAuthController.signUp.bind(userAuthController))

export const userRouter = router