import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { sendErrorResponse } from "../utils/responseHandler";
import { isBlocked } from "../integration/authenticateService";
import { isVerified } from "../integration/authenticateService";


interface AuthenticatedRequest extends Request {
    user?: {
        user: string;
        role: string;
        iat: number;
        exp: number;
    };
}

export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const accessToken = req.cookies['accessToken']
        const decodedToken: any = jwt.decode(accessToken)
        const { user, role } = decodedToken

        //check User Blocked Method
        const isBlock = await isBlocked(user)
        if (isBlock) {
            sendErrorResponse(res, 'User Blocked', 403)
        }

        //check User Verified Method
        const isVerify = await isVerified(user)
        if (isVerify) {
            sendErrorResponse(res, 'User Not Verified', 401)
        }



        next()
    } catch (error: unknown) {
        sendErrorResponse(res, 'Internal Server Error', 500)
    }
}