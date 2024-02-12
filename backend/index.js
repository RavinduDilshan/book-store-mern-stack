import express, { response } from 'express';
import {PORT,MONGODBURL} from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';


const app = express();

//middleware for parsing request body
app.use(express.json());


app.get('/',(request,response)=>{
    console.log(request);
    return response.status(323).send('this is mern stack tut');

});

//route for save a new book
app.post('/books',async(request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({
                message:'send all required fields: title,author,publishYear'
            });

        

        }
        const newBook={
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);

    }catch(error){
        console.log(error);
        return response.status(500).send({
            message:error.message
        });
    }

});

//route for get all books from database
app.get('/books',async(request,response)=>{
    try{
        const books = await Book.find({});
        response.status(200).json({
            count:books.length,
            data:books
        });

    } catch(error){
        console.log(error);
        return response.status(500).send({
            message: error.message
        })

    }

});

//route for get one book from database by id
app.get('/books/:id',async(request,response)=>{
    try{

        const id= request.params.id;
        const books = await Book.findById(id);
        response.status(200).json({
            count:books.length,
            data:books
        });

    } catch(error){
        console.log(error);
        return response.status(500).send({
            message: error.message
        })

    }

});

//route for update a book
app.put('/books/:id',async (request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
           return response.status(400).send({
                message:'send all required fields title,author,publish year'
            });
        }

        const {id} = request.params;
        const results= await Book.findByIdAndUpdate(id,request.body);
        if(!results){
            return response.status(404).json({
                message:'book not found'
            });

         
        }

        return response.status(200).send({
            message:'book updated succesfully'
        });

    }catch(error){
        console.log(error.message);
        return response.status(500).send({
            message:error.message
        });

    }

});


mongoose.connect(MONGODBURL).then(()=>{
    console.log('app connected to database');
    app.listen(PORT,()=>{
        console.log(`app is listining to port: ${PORT}`);
    });
}).catch((error)=>{
    console.log(error);

});

