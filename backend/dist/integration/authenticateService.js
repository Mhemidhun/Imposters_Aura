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
exports.isVerified = exports.isBlocked = void 0;
const user_model_1 = require("../models/user.model");
// Check User Block
const isBlocked = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isBlock = yield user_model_1.UserModel.findById(userId);
        if (isBlock === null || isBlock === void 0 ? void 0 : isBlock.isBlocked) {
            return true;
        }
        return false;
    }
    catch (error) {
        throw error;
    }
});
exports.isBlocked = isBlocked;
// Check User Verified
const isVerified = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isBlock = yield user_model_1.UserModel.findById(userId);
        if (isBlock === null || isBlock === void 0 ? void 0 : isBlock.isVerfied) {
            return true;
        }
        return false;
    }
    catch (error) {
        throw error;
    }
});
exports.isVerified = isVerified;
