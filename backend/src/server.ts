import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config';
import morgan from 'morgan';
import { userRouter } from './routes/user.routes';
import { adminRouter } from './routes/admin.routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'


dotenv.config()

const app = express()
const PORT = process.env.PORT

connectDB()

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:4000",
    // "https://www.learngrow.live",
    // "https://api.learngrow.live",
  ];
  
  const corsOptions = {
    origin: (origin: any, callback: any) => {
  
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
  };
  
  app.use(cors(corsOptions));

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/user-service', userRouter)
app.use('/api/admin-service', adminRouter)

app.listen(PORT, (error: unknown) => {
    if(error) throw error
    console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
})
