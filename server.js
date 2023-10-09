import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import fileUpload from "express-fileupload";

import postsRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import commentRouter from "./routes/comment.js";
import placesRouter from "./routes/places.js";

import * as fs from "fs";
import * as https from "https";
import tourRoutes from "./routes/tourRoutes.js";
import tourRoutesRouter from "./routes/tourRoutes.js";

const app = express();

const port = process.env.PORT || 80;
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

const options = {
  cert: fs.readFileSync("./sslcert/fullchain.pem"),
  key: fs.readFileSync("./sslcert/privkey.pem"),
};

const uri =
  "mongodb+srv://ivanlom227:Whaven1488@whereishedgehog.qvq7vwc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Databse connection established");
});

app.use("/posts", postsRouter);
app.use("/users", userRouter);
app.use("/comments", commentRouter);
app.use("/places",placesRouter);
app.use('/tours/',tourRoutesRouter)
// app.use('/static', express.static('public'));
app.use(express.static("static"));
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

https.createServer(options, app).listen(443);
