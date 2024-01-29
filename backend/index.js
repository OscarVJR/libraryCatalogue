import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose, { mongo } from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';
const app = express();

// the middleware for the request body to be parsed
app.use(express.json());

// our Middleware handling CORS policy
app.use(cors());

/*
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type'],
})
);
*/
app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('welcome');
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
.then(
    ()=> {
        console.log('app connected to the database!');
        app.listen(PORT, () => {
            console.log(`app is listening to port: ${PORT}`)
        });
    }
).catch(
    (error)=> {
        console.log(error)
    }
)