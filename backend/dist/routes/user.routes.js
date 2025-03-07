"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/userController/auth.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/signup', auth_controller_1.userAuthController.userSignUp.bind(auth_controller_1.userAuthController));
router.post('/login', authMiddleware_1.authenticateUser, auth_controller_1.userAuthController.userLogin.bind(auth_controller_1.userAuthController));
exports.userRouter = router;
