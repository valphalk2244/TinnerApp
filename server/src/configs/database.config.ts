import mongoose from "mongoose"

const username = Bun.env.MONGO_USERNAME || 'thanaphatja'
const password = Bun.env.MONGO_PASSWORD || 'Na1kdlXsbVCK8wqC'
const db_name = Bun.env.MONGGO_DBNAME || 'tinnerapp'

// MODE = "dev"
// DB_USERNAME = 'thanaphatja'
// DB_PASSWORD = 'Na1kdlXsbVCK8wqC'
// MONGO_DBNAME = 'tinnerapp'

// const uri = `mongodb+srv://${username}:${password}@cluster0.5joiu.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`
const uri = `mongodb+srv://${username}:${password}@cluster0.xfnsh.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`


export const mongodb = {
    connect: async function () {
        try {
            await mongoose.connect(uri)
            console.log("------------- mongoDB Connected!!!!! -------------")
        } catch (error) {
            console.error("------------- mongoDB connected fail -------------")
            console.error(error)

        }
    }
}