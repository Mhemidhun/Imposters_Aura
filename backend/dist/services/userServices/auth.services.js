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
exports.userAuthServices = void 0;
const auth_repository_1 = __importDefault(require("../../repositories/userRepository/auth.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserAuthServices {
    constructor(userAuthRepository) {
        this.userAuthRepository = userAuthRepository;
    }
    userSignup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(data.password, 12);
                data.password = hashedPassword;
                const addUser = yield this.userAuthRepository.userSignup(data);
                return addUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    userLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginUser = yield this.userAuthRepository.userLogin(email, password);
                const isPassword = yield bcrypt_1.default.compare(password, loginUser.password);
                if (!isPassword) {
                    const error = new Error('Invalid Credentials');
                    error.name = 'InvalidCredentials';
                    throw error;
                }
                return loginUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserAuthServices;
const userAuthRepository = new auth_repository_1.default();
exports.userAuthServices = new UserAuthServices(userAuthRepository);
