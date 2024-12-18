import Elysia from "elysia"
import { AuthMiddleware, AuthPayLoad } from "../middlewares/auth.middleware"
import { UserDto } from "../types/user.type"
import { LikeService } from "../services/like.service"

export const LikeController = new Elysia({
    prefix: "/api/Like",
    tags: ['Like']
})
    .use(AuthMiddleware)
    .use(UserDto)

    .put('/', async ({ body: { traget_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayLoad).id
            await LikeService.toggleLike(user_id, traget_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            throw error
        }
    }, {
        detail: { summary: "Toggle Like" },
        isSignIn: true,
        body: "traget_id"
    })