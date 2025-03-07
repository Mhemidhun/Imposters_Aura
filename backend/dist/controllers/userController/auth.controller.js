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
exports.userAuthController = void 0;
const auth_services_1 = require("../../services/userServices/auth.services");
const jwt_1 = require("../../integration/jwt");
const responseHandler_1 = require("../../utils/responseHandler");
class UserAuthController {
    constructor(userAuthServices) {
        this.userAuthServices = userAuthServices;
        this.jwtService = new jwt_1.JwtService();
    }
    userSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('req body ', req.body);
                const data = req.body;
                const addUser = yield this.userAuthServices.userSignup(data);
                const accessToken = yield this.jwtService.createToken(addUser === null || addUser === void 0 ? void 0 : addUser._id, String(addUser === null || addUser === void 0 ? void 0 : addUser.role));
                const refreshToken = yield this.jwtService.createRefreshToken(addUser === null || addUser === void 0 ? void 0 : addUser._id, String(addUser === null || addUser === void 0 ? void 0 : addUser.role));
                (0, responseHandler_1.sendResponse)({
                    res,
                    success: true,
                    message: 'User SignedUp Successfully',
                    data: addUser,
                    cookies: [
                        {
                            name: "accessToken",
                            value: String(accessToken),
                            options: { httpOnly: false },
                        },
                        {
                            name: "refreshToken",
                            value: String(refreshToken),
                            options: { httpOnly: true },
                        },
                    ],
                });
                return;
            }
            catch (error) {
                console.log(error);
                (0, responseHandler_1.sendErrorResponse)(res, "Internal Server Error", 500);
                return;
            }
        });
    }
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const loginUser = yield this.userAuthServices.userLogin(email, password);
                const accessToken = yield this.jwtService.createToken(loginUser === null || loginUser === void 0 ? void 0 : loginUser._id, String(loginUser === null || loginUser === void 0 ? void 0 : loginUser.role));
                const refreshToken = yield this.jwtService.createRefreshToken(loginUser === null || loginUser === void 0 ? void 0 : loginUser._id, String(loginUser === null || loginUser === void 0 ? void 0 : loginUser.role));
                (0, responseHandler_1.sendResponse)({
                    res,
                    success: true,
                    message: 'User Login Successfully',
                    data: loginUser,
                    cookies: [
                        {
                            name: "accessToken",
                            value: String(accessToken),
                            options: { httpOnly: false },
                        },
                        {
                            name: "refreshToken",
                            value: String(refreshToken),
                            options: { httpOnly: true },
                        },
                    ],
                });
                return;
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.name = 'InvalidCredentials') {
                        (0, responseHandler_1.sendErrorResponse)(res, "Invalid Credentials", 403);
                        return;
                    }
                }
                (0, responseHandler_1.sendErrorResponse)(res, "Internal Server Error", 500);
                return;
            }
        });
    }
}
exports.default = UserAuthController;
exports.userAuthController = new UserAuthController(auth_services_1.userAuthServices);
