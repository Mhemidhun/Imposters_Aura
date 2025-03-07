import dotenv from 'dotenv'

dotenv.config()

export const MONGO_URI = process.env.MONGO_URI
export const JWT_SECRET: string = String(process.env.JWT_SECRET)

export const ADMIN_EMAIL: string = String(process.env.ADMIN_EMAIL)
export const ADMIN_PASSWORD: string = String(process.env.ADMIN_PASSWORD)
