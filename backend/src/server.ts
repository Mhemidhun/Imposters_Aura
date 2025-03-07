import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.config';
import morgan from 'morgan'
import { userRouter } from './routes/user.routes';
import bodyParser from 'body-parser'


dotenv.config()

const app = express()
const PORT = process.env.PORT

connectDB()

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/user-service',userRouter)

app.listen(PORT, (error: unknown) => {
    if(error) throw error
    console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
})
