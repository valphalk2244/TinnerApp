import mongoose from "mongoose"

const username = Bun.env.DB_USERNAME || 'your-username'
const password = Bun.env.DB_PASSWORD || 'your-password'
const db_name = Bun.env.MONGO_DBNAME || 'tinner_class_example'

const uri = `mongodb+srv://${username}:${password}@cluster0.xfnsh.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`

export const MongoDB = {
    connect: async function () {
        try {
            await mongoose.connect(uri)
            console.log('--------MongoDB Conneted--------')
        } catch (error) {
            console.log('--------MongoDB Connection Error--------')
            console.log(error)
        }
    }
}




















//66162110377-4 ธนภัฏ แจ้งหมื่นไวย