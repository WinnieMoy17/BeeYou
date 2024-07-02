import express from 'express';
import { User } from '../models/userModel.js';

const router = express.Router();

// Route for saving a new user
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
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

export default router;