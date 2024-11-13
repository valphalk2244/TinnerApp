import { Elysia, t } from "elysia"
import { example } from "./controllers/example.controller"
import { SwaggerConfig } from "./config/swagger.config"
import { tlsConfig } from "./config/tls.config"
import cors from "@elysiajs/cors"

const app = new Elysia()
  .use(cors())
  .use(SwaggerConfig)
  .use(example)

  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })

let protocol = 'http'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)
