import { IUserAuthServicesMethods } from "../../interface/serviceInterface/user.interface";
import { IUser } from "../../models/user.model";
import UserAuthRepository from "../../repositories/userRepository/auth.repository";
import { UserSignUpInput } from "../../types/userTypes";
import bcrypt from 'bcrypt'


export default class UserAuthServices implements IUserAuthServicesMethods {
    private userAuthRepository: UserAuthRepository

    constructor(userAuthRepository: UserAuthRepository){
        this.userAuthRepository = userAuthRepository
    }

    async userSignup(data: UserSignUpInput): Promise<IUser> {
        try{
            const hashedPassword = await bcrypt.hash(data.password, 12)
            data.password = hashedPassword
            const addUser = await this.userAuthRepository.userSignup(data)
            return addUser
        }catch(error: unknown){
            throw error
        }
    }

    async userLogin(email: string, password: string): Promise<IUser> {
        try{
            const loginUser = await this.userAuthRepository.userLogin(email, password)
            const isPassword = await bcrypt.compare(password, loginUser.password)
            if(!isPassword){
                const error = new Error('Invalid Credentials')
                error.name = 'InvalidCredentials'
                throw error
            }
            return loginUser
        }catch(error: unknown){
            throw error
        }
    }
}

const userAuthRepository = new UserAuthRepository()
export const userAuthServices = new UserAuthServices(userAuthRepository)
