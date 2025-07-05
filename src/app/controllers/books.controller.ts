import express, {  Request, Response } from "express";
import { Book } from "../models/books.model";
import { z } from "zod";

export const booksRoutes = express.Router()

const createBookZodSchema = z.object({
    title :z.string(),
    author :z.string(),
    genre :z.string(),
    isbn :z.string(),
    description :z.string().optional(),
    copies :z.number(),
    available :z.boolean(),
})

booksRoutes.post('/',async (req:Request, res : Response)=>{
    

    try{
        const body = await createBookZodSchema.parseAsync(req.body);
        const book = await Book.create(body);

        res.status(201).json({
            success: true,
            message: "book created successfully ",
            book
        })
    }
    catch(error : any){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }

})

booksRoutes.get('/',async (req:Request, res : Response)=>{
    const books = await Book.find();

    res.status(201).json({
        success: true,
        message: "book created",
        books
    })

})
booksRoutes.get('/:bookId',async (req:Request, res : Response)=>{
    const bookId=req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(201).json({
        success: true,
        message: "book created",
        book
    })

})
booksRoutes.patch('/:bookId',async (req:Request, res : Response)=>{
    const updatedBody =req.body;
    const bookId=req.params.bookId;
    const book = await Book.findByIdAndUpdate(bookId,updatedBody,{new :true});

    res.status(201).json({
        success: true,
        message: "book updated",
        book
    })

})
booksRoutes.delete('/:bookId',async (req:Request, res : Response)=>{
    const bookId=req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);

    res.status(201).json({
        success: true,
        message: "book deleted",
        book
    })

})