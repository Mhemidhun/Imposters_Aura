import { Request, Response } from "express";
import UserAuthServices, { userAuthServices } from "../../services/userServices/auth.services";
import { JwtService } from "../../integration/jwt";
import { sendErrorResponse, sendResponse } from "../../utils/responseHandler";

export default class UserAuthController {
    private userAuthServices: UserAuthServices
    private jwtService: JwtService

    constructor(userAuthServices: UserAuthServices) {
        this.userAuthServices = userAuthServices
        this.jwtService = new JwtService()
    }

    async userSignUp(req: Request, res: Response): Promise<void> {
        try {
            console.log('req body ', req.body)
            const data = req.body
            const addUser = await this.userAuthServices.userSignup(data)

            const accessToken = await this.jwtService.createToken(addUser?._id, String(addUser?.role))
            const refreshToken = await this.jwtService.createRefreshToken(addUser?._id, String(addUser?.role))

            sendResponse({
                res,
                success: true,
                message: 'User SignedUp Successfully',
                data: addUser,
                cookies: [
                    {
                        name: "accessToken",
                        value: String(accessToken),
                        options: { httpOnly: false },
                    },
                    {
                        name: "refreshToken",
                        value: String(refreshToken),
                        options: { httpOnly: true },
                    },
                ],
            })
            return
        } catch (error: unknown) {
            console.log(error)
            sendErrorResponse(res, "Internal Server Error", 500);
            return
        }
    }

    async userLogin(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body
            const loginUser = await this.userAuthServices.userLogin(email, password)
            const accessToken = await this.jwtService.createToken(loginUser?._id, String(loginUser?.role))
            const refreshToken = await this.jwtService.createRefreshToken(loginUser?._id, String(loginUser?.role))

            sendResponse({
                res,
                success: true,
                message: 'User Login Successfully',
                data: loginUser,
                cookies: [
                    {
                        name: "accessToken",
                        value: String(accessToken),
                        options: { httpOnly: false },
                    },
                    {
                        name: "refreshToken",
                        value: String(refreshToken),
                        options: { httpOnly: true },
                    },
                ],
            })
            return
        } catch (error: unknown) {
            if(error instanceof Error){
                if(error.name = 'InvalidCredentials'){
                    sendErrorResponse(res, "Invalid Credentials", 403);
                    return
                }
            }
            sendErrorResponse(res, "Internal Server Error", 500);
            return
        }
    }

}

export const userAuthController = new UserAuthController(userAuthServices)
