import mongoose, { model, Schema, Document } from "mongoose";
import { ObjectId } from 'mongodb'

export interface IUser extends Document {
    _id: ObjectId,
    username: string,
    email: string,
    phone: number,
    password: string,
    isBlocked: boolean,
    isVerfied: boolean,
    createdAt: Date,
    updatedAt: Date
}

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, required: true, default: false },
    isVerfied: { type: Boolean, required: true, default: false },
}, { timestamps: true }
)

export const UserModel = mongoose.model<IUser>('user', UserSchema)
