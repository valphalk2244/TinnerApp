import mongoose from "mongoose"

const username = Bun.env.MONGO_DB_USERNAME || 'your-username'
const password = Bun.env.MONGGO_DB_PASSWORD || 'your-password'
const db_name = Bun.env.MONGO_DBNAME || 'tinner_class_example'

const uri = `mongodb+srv://${username}:${password}@cluster0.zvluv.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`

export const MongoDB = {
    connect: async function () {
        try {
            await mongoose.connect(uri)
            console.log(' ---- MongoDB Conneted ----')
        } catch (error) {
            console.error(' ---- MongoDB connection error ----')
            console.error(error)
        }
    }
}