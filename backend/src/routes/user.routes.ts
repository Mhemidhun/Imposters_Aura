import { Router } from "express";
import { userAuthController } from '../controllers/userController/auth.controller'
import { authenticateUser } from "../middleware/authMiddleware";
import authenticateToken from "../middleware/tokenVerification";

const router = Router()

router.post('/signup', userAuthController.userSignUp.bind(userAuthController))
router.post('/login', authenticateUser, userAuthController.userLogin.bind(userAuthController))

export const userRouter = router