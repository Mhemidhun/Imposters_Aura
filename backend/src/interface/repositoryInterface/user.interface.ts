import { IUser } from "../../models/user.model";
import { UserSignUpInput } from "../../types/userTypes";

export interface IUserAuthRepositoryMethods {
    userSignup(data: UserSignUpInput): Promise<IUser>
}