"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/userController/auth.controller");
const router = (0, express_1.Router)();
router.post('/user/signup', auth_controller_1.userAuthController.signUp.bind(auth_controller_1.userAuthController));
exports.userRouter = router;
