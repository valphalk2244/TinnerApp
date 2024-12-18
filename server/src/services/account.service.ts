import { login, register } from './../types/account.type'
import { User } from './../models/User.model'
import { user } from '../types/user.type'

export const AccountService = {
    login: async function (loginData: login): Promise<user> {
        const user = await User.findOne({ username: loginData.username })
            .populate("photos")

            .populate({
                path: "following",
                select: "_id",
            })
            .populate({
                path: "followers",
                select: "_id",
            })

            .exec()
        if (!user)
            throw new Error("User does not exist")
        const verifyPassword = await user.verifyPassword(loginData.password)
        if (!verifyPassword)
            throw new Error("Password is incorrect")
        return user.toUser()
    },

    createNewUser: async function (registerData: register): Promise<user> {
        const user = await User.findOne({ username: registerData.username }).exec()
        if (user)
            throw new Error(`${registerData.username} already exists`)
        const newUser = await User.createUser(registerData)
        return newUser.toUser()
    },

}














//66162110377-4 ธนภัฏ แจ้งหมื่นไวย