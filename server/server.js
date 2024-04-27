import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {dataBaseConnection} from './config/database.js'
import router from './routers/router.js'


dotenv.config()

dataBaseConnection

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))


app.use(cors({
    origin: process.env.CLIENT_URL
}))


// ROUTE API
app.use("/api", router)







app.listen(process.env.PORT, () => {
    console.log(`server is running : ${process.env.BASE_URL}`)
})

