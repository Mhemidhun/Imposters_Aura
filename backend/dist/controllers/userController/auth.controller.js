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
class UserAuthController {
    constructor(userAuthServices) {
        this.userAuthServices = userAuthServices;
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('req body ', req.body);
                const data = req.body;
                const addUser = yield this.userAuthServices.userSignup(data);
                return res
                    .status(200)
                    .send({
                    success: true,
                    message: 'User Added Successfully',
                    result: addUser
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = UserAuthController;
exports.userAuthController = new UserAuthController(auth_services_1.userAuthServices);
