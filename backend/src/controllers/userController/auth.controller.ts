import { Request, Response } from "express";
import UserAuthServices, { userAuthServices } from "../../services/userServices/auth.services";

export default class UserAuthController {
    private userAuthServices: UserAuthServices

    constructor(userAuthServices: UserAuthServices) {
        this.userAuthServices = userAuthServices
    }

    async signUp(req: Request, res: Response): Promise<any> {
        try {
            console.log('req body ', req.body)
            const data = req.body
            const addUser = await this.userAuthServices.userSignup(data)
            return res
            .status(200)
            .send({
                success: true,
                message: 'User Added Successfully',
                result: addUser
            })
        } catch (error: unknown) {
            console.log(error)
        }
    }

}

export const userAuthController = new UserAuthController(userAuthServices)
