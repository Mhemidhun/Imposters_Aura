"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.sendResponse = void 0;
const sendResponse = ({ res, statusCode = 200, success, message, data, cookies = [], }) => {
    cookies.forEach(({ name, value, options }) => {
        res.cookie(name, value, options);
    });
    return res.status(statusCode).send({
        success,
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
const sendErrorResponse = (res, message = "Internal Server Error", statusCode = 500) => {
    res.status(statusCode).json({ success: false, message });
};
exports.sendErrorResponse = sendErrorResponse;
