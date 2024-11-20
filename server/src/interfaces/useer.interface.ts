import mongoose, { mongo } from "mongoose"
import { register, user } from "../types/account.type"

type userWithOutId = Omit<user, 'id'>

export interface IUserDocument extends mongoose.Document, userWithOutId {
    password_hash: string

    verifyPassword: (password: string) => Promise<boolean>
    toUser: () => user
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
    createUser: (registerData: register) => Promise<IUserDocument>
}