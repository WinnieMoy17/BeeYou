import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';

const router = express.Router();
const saltRounds = 10;

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

router.get('/login', async (req, res) => {
    try {
        const { username, password } = req.query;
        if (!username || !password) {
            return res.status(400).send({message: "Username and password required."});
        }
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).send({message: "User not found."});
        }

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(401).send({message: "Incorrect password."});
        }

        res.status(200).send({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, rePassword } = req.query;
        if (!username || !email || !password) {
            return res.status(400).send({message: "Username, email and password required."});
        }

        if (!rePassword) {
            return res.status(400).send({message: "Please re-enter password."});
        }

        const findEmail = await User.findOne({ email: email });
        if (findEmail) {
            return res.status(400).send({message: "Email already registered."});
        }

        const findUsername = await User.findOne({ username: username });
        if (findUsername) {
            return res.status(400).send({message: "Username taken."});
        }

        if (password != rePassword) {
            return res.status(400).send({message: "Passwords do not match."});
        }

        const hashedPass = await bcrypt.hash(password, saltRounds);

        const newUser = {
            username: username,
            password: hashedPass,
            email: email,
            pollen: 0
        };

        const user = await User.create(newUser);
        return res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
})

export default router;