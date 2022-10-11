import express from 'express'
import dotev from 'dotenv'
import {database} from './database/database.js'
import router from './Routes/AuthRouter.js'
import cors from 'cors'
import tourRouter from './Routes/TourRouter.js'
import chatRouter from './Routes/ChatRouter.js'
import messageRouter from './Routes/MessageRouter.js'
dotev.config()
const app = express()


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json())
app.use(router)
app.use(tourRouter)
app.use(chatRouter)
app.use(messageRouter)
database()


app.listen(process.env.PORT,()=>{
    console.log('server listening on port 5000')
})