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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../utils/constant");
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies['accessToken'];
    const refreshToken = req.cookies['refreshToken'];
    if (!accessToken) {
        return res
            .status(401)
            .send({ failToken: true, message: 'No access token provided' });
    }
    try {
        // Verify Access Token
        const accessPayload = jsonwebtoken_1.default.verify(accessToken, constant_1.JWT_SECRET);
        // If valid, attach payload to request and proceed
        req.user = accessPayload;
        return next();
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            if (!refreshToken) {
                console.log('Refresh not having');
                return res
                    .status(401)
                    .send({ failToken: true, message: 'No refresh token provided' });
            }
            // Verify Refresh Token
            try {
                const refreshPayload = jsonwebtoken_1.default.verify(refreshToken, constant_1.JWT_SECRET);
                if (!refreshPayload) {
                    return res
                        .status(401)
                        .send({ message: 'Invalid refresh token. Please log in.' });
                }
                // Generate a new Access Token
                const newAccessToken = jsonwebtoken_1.default.sign({ user: refreshPayload.user, role: refreshPayload.role }, constant_1.JWT_SECRET, { expiresIn: '1h' });
                // Set new Access Token in cookies
                res.cookie('accessToken', newAccessToken, { httpOnly: true });
                // Attach payload to request
                req.user = refreshPayload;
                return next();
            }
            catch (refreshErr) {
                if (refreshErr.name === 'TokenExpiredError') {
                    return res
                        .status(401)
                        .send({ message: 'Session expired. Please log in again.' });
                }
                return res
                    .status(401)
                    .send({ message: 'Invalid refresh token. Please log in.' });
            }
        }
        return res
            .status(400)
            .send({ message: 'Invalid access token. Please log in.' });
    }
});
exports.default = authenticateToken;
