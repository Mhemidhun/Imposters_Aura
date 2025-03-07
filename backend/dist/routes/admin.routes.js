"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/adminController/auth.controller");
const router = (0, express_1.Router)();
router.post('/admin/login', auth_controller_1.adminAuthController.adminLogin.bind(auth_controller_1.adminAuthController));
exports.adminRouter = router;
