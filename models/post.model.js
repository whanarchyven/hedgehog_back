//post.model.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const postSchema = new Schema({
    caption: {
        type: String
    },
    image: {
        type: String
    },
    location: {
        type: String,
    },
    xCoord: {
        type: Number
    },
    yCoord: {
        type: Number
    },
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
    likes: [{type: Schema.Types.ObjectId, ref: "User"}],
    dislikes: [{type: Schema.Types.ObjectId, ref: "User"}],
    username: {
        type: String
    },
    nickname:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

const Post = mongoose.model("Post", postSchema);
export default Post