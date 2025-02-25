import { IUserAuthRepositoryMethods } from "../../interface/repositoryInterface/user.interface";
import { IUser, UserModel } from "../../models/user.model";
import { UserSignUpInput } from "../../types/userTypes";
import BaseRepository from "../base.repository";


export default class UserAuthRepository extends BaseRepository<{
    User: IUser
}>
 implements IUserAuthRepositoryMethods {

    constructor(){
        super({
            User: UserModel
        })
    }


    async userSignup(data: UserSignUpInput): Promise<IUser> {
        try{
            const addUser = await this.createData('User', data as unknown as Partial<IUser>)
            return addUser
        }catch(error: unknown){
            throw error
        }
    }
}

