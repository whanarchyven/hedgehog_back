import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import fileUpload from "express-fileupload"

import postsRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import commentRouter from "./routes/comment.js";

const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(fileUpload({}))

const uri = 'mongodb+srv://ivanlom227:Whaven1488@whereishedgehog.qvq7vwc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Databse connection established");
});

app.use('/posts',postsRouter)
app.use('/users',userRouter)
app.use('/comments',commentRouter)
// app.use('/static', express.static('public'));
app.use(express.static('static'));
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});