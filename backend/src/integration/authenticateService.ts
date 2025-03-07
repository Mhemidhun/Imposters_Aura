import { UserModel } from "../models/user.model"

// Check User Block
export const isBlocked = async (userId: string): Promise<boolean> => {
    try{
        const isBlock = await UserModel.findById(userId)
        if(isBlock?.isBlocked){
            return true
        }
        return false
    }catch(error: unknown){
        throw error
    }
}


// Check User Verified
export const isVerified = async (userId: string): Promise<boolean> => {
    try{
        const isBlock = await UserModel.findById(userId)
        if(isBlock?.isVerfied){
            return true
        }
        return false
    }catch(error: unknown){
        throw error
    }
}

