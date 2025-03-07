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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlocked = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseHandler_1 = require("../utils/responseHandler");
const isBlocked = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.cookies['accessToken'];
        const decodedToken = jsonwebtoken_1.default.decode(accessToken);
        const { user, role } = decodedToken;
        const findUser = yield user_model_1.UserModel.findById(user);
        if (findUser === null || findUser === void 0 ? void 0 : findUser.isBlocked) {
            (0, responseHandler_1.sendErrorResponse)(res, 'User Blocked', 403);
        }
        next();
    }
    catch (error) {
        (0, responseHandler_1.sendErrorResponse)(res, 'Internal Server Error', 500);
    }
});
exports.isBlocked = isBlocked;
