import express, { Application, Request, Response } from 'express';
import { booksRoutes } from './app/controllers/books.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';
import cors from 'cors';

const app : Application  = express();
app.use(express.json())
app.use(cors({origin:['http://localhost:5173','https://lib-management-mu.vercel.app']}))
app.use("/api/books",booksRoutes)
app.use('/api/borrow', borrowRoutes);
app.get('/',(req:Request, res : Response)=>{
    res.send("Welcome to library management app")
})



export default app;