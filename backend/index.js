import express from "express"
import {PORT} from "./config.js";

const app = express();

app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("Welcome to the Mern Stack");
})
app.listen(PORT, () => {
    console.log(`App is listening to PORT: ${PORT}`);
});




