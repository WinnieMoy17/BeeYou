import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";

const app = express(); 

// Middleware for parsing request body (JSON)
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Hey! Time to Bee-You!');
});



// Route for saving a new user
app.post('/register', async (req, res) => {
    try {
        if (
            !req.body.username ||
            !req.body.password ||
            !req.body.email
        ) {
            return res.status(400).send({
                message: 'Send all required fields: username, password, email',
            });
        }
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            pollen: 0
        };

        const user = await User.create(newUser);
        return res.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Route to Get all users from database
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

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