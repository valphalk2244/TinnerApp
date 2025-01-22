import jwt from "@elysiajs/jwt"

export const jwtConfig = jwt({
    name: 'jwt',
    secret: Bun.env.JWT_SECRET || 'vskjgf;gvmcxlgjfd;gdslg',
    exp: '1d'
})