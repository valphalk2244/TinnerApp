import Elysia, { Static, t } from "elysia"
import { _user } from "./user.type"
import { _register } from "./register.type"


export const _login = t.Object({
    username: t.String(),
    password: t.String()
})

export const _userAndToken = t.Object({
    token: t.String(),
    user: _user
})
export const AccountDto = new Elysia().model({
    //request
    register: _register,
    login: _login,
    //response
    user_and_token: _userAndToken,
})




export type login = Static<typeof _login>
export type register = Static<typeof _register>












//66162110377-4 ธนภัฏ แจ้งหมื่นไวย
