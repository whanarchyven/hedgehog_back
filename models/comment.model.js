//comment.model.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String
    },
    nickname:{
        type:String
    },

});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment