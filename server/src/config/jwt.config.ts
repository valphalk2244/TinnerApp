import jwt from '@elysiajs/jwt'

export const jwtConfig = jwt({
    name: 'jwt',
    secret: Bun.env.JWT_SECRET || 'skibididobdob', exp: '900d'
})








//66162110377-4 ธนภัฏ แจ้งหมื่นไวย