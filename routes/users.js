//users.js

import Router from "express"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import fileService from "../services/fileService.js";
import auth from "../middleware/auth.js";
import UserController from "../controllers/UserController.js";

function generateAccessToken(id, username) {
    return jwt.sign({ id, username }, 'a29fa2a6b70a36a032c8f5cfeabe852aa77551aad154da1b2da579ac161d41bcd978aad1223d0d86bf5c4e8e5a017a434f84cd5c5d8c00573117a8b7bb18a0eb', {
        expiresIn: "36000s"
    });
}

const userRouter=new Router()


userRouter.route("/register").post((req, res) => {
    const { username, password,name,surname,avatar } = req.body;
    console.log(req.files.image)
    const fileName = req.files.image?fileService.saveFile(req.files.image):'johnDoe.jpg'

    if (!password || !username||!name||!surname) {
        return res.status(400).json({ msg: "Please Fill All Fields" });
    }

    User.findOne({ username: username }).then((err, user) => {
        if (err) {
            res.send({ message: "User Already Exist" });
        } else {
            const newUser = new User({ username, password,name,surname, avatar:fileName });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then((user) => {
                        const token = generateAccessToken(user.id, user.username);
                        res.json({
                            token,
                            user
                        });
                    });
                });
            });
        }
    });
});

userRouter.route("/login").post((req, res) => {
    const { username, password } = req.body;

    if (!password || !username) {
        return res.status(400).json({ msg: "Please Fill All Fields" });
    }
    User.findOne({ username: username }).then((user) => {
        if (user) {
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (!isMatch)
                    return res.status(400).json({ msg: "Invalid Credentials" });

                const token = generateAccessToken(user.id, user.username);

                return res.json({
                    token,
                    user
                });
            });
        }
        else{
            res.json('User not registered')
        }
    });
});

userRouter.route('/:id').get(UserController.getUser);

export default userRouter