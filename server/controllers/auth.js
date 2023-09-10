import bcrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// REGISTER USER
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrpt.genSalt();
        const passwordHash = await bcrpt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
        });
        const SavedUser = await newUser.save();
        res.status(201).json(SavedUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// LOGIN USER
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const  user = await findOne({ email: email });

        if(!user) return res.status(400).json({ msg: "User does not exist." });

        const isMatch = await bcrpt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ msg: "Incorrect password." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}