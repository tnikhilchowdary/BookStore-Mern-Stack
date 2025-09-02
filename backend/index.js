import express from "express"
import mongoose from "mongoose";
import {PORT, mongoDBURL} from "./config.js";
import {Book} from "./models/bookModel.js";

const app = express();
app.use(express.json());

app.post("/books", async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                success: false,
                message:"Please provide title, author, and publish year",
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);
        return res.status(201).send({
            success: true,
            data: book,
        });

    }
    catch(error){
        console.log(error.message);
        res.status(500).send({success: false, message:error.message});
    }
});


app.get("/allbooks", async (req, res) => {
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})


app.get("/book/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);

        if(!book){
            return res.status(404).send({message:"Book Not Found"});
        }
        return res.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        res.status.send({message:error.message});
    }
})


app.put('/books/:id', async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message:"Send all required fields:title, author, publishYear",
            });
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({message: "Book not Found"})
        }

        return res.status(200).send({message:'Book Updated Succssfully'})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});



app.listen(PORT, () => {
    console.log(`App is listening to PORT: ${PORT}`);
});

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log("App Connected to Database");
})
.catch((error) => {
    console.log(error);
})




