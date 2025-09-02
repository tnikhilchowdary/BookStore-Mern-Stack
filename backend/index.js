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
        return res.status(200).json(books);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})
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




