"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthController = void 0;
const jwt_1 = require("../../integration/jwt");
const constant_1 = require("../../utils/constant");
class AdminAuthcontroller {
    constructor() {
        this.jwtService = new jwt_1.JwtService();
    }
    adminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (email !== constant_1.ADMIN_EMAIL && password !== constant_1.ADMIN_PASSWORD) {
                    const error = new Error('Invalid Credentials');
                    error.name = 'InvalidCredentials';
                    throw error;
                }
                const accessToken = yield this.jwtService.createToken(email, 'admin');
                const refreshToken = yield this.jwtService.createRefreshToken(email, 'admin');
                return res
                    .status(200)
                    .cookie('accessToken', accessToken, {
                    httpOnly: false
                }).cookie('refreshToken', refreshToken, {
                    httpOnly: true
                })
                    .send({
                    success: true,
                    message: 'Admin Found Successfully',
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'InvalidCredentials') {
                        res.status(401).send({
                            success: false,
                            message: 'Invalid Credentials',
                        });
                    }
                }
            }
        });
    }
}
exports.default = AdminAuthcontroller;
exports.adminAuthController = new AdminAuthcontroller();
