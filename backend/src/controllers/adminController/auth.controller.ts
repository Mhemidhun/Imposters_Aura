import { JwtService } from "../../integration/jwt";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../utils/constant"
import { Request, Response } from "express";
import { sendResponse } from "../../utils/responseHandler";

export default class AdminAuthcontroller {
    private jwtService: JwtService

    constructor() {
        this.jwtService = new JwtService()
    }

    async adminLogin(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body

            if (email !== ADMIN_EMAIL && password !== ADMIN_PASSWORD) {
                const error = new Error('Invalid Credentials')
                error.name = 'InvalidCredentials'
                throw error
            }

            const accessToken = await this.jwtService.createToken(email, 'admin')
            const refreshToken = await this.jwtService.createRefreshToken(email, 'admin')

            sendResponse({
                res,
                success: true,
                message: 'Admin Found Successfully',
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

        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'InvalidCredentials') {
                    res.status(401).send({
                        success: false,
                        message: 'Invalid Credentials',
                    })
                }
            }
        }
    }
}

export const adminAuthController = new AdminAuthcontroller()