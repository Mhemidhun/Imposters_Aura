"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_PASSWORD = exports.ADMIN_EMAIL = exports.JWT_SECRET = exports.MONGO_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGO_URI = process.env.MONGO_URI;
exports.JWT_SECRET = String(process.env.JWT_SECRET);
exports.ADMIN_EMAIL = String(process.env.ADMIN_EMAIL);
exports.ADMIN_PASSWORD = String(process.env.ADMIN_PASSWORD);
