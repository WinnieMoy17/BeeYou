import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import userRoutes from './routes/userRoutes.js';

const app = express(); 

// Middleware for parsing request body (JSON)
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Hey! Time to Bee-You!');
});

app.use('/users', userRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })