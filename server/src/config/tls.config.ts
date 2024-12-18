import { file } from "bun"

let _tls = {}
const mode = Bun.env.MODE || 'production'

if (mode !== 'production') {
    const cert = file("../ssl/localhost.pem")
    const key = file("../ssl/localhost-key.pem")
    _tls = { cert, key }
}

export const tlsConfig = { ..._tls }










//66162110377-4 ธนภัฏ แจ้งหมื่นไวย