import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

export const dataBaseConnection = mongoose.connect(`${process.env.MONGO_URI}`)


mongoose.connection.on("open", () => {
    console.log("Database successfully connected to the server")
})

mongoose.connection.on("error", () => {
    console.log("Failed to connect the server with the Database")
})