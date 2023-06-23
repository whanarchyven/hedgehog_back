//user.model.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    level:{
        type:Number,
        required:true,
        default:0
    },
    exp:{
        type:Number,
        required:true,
        default:0
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    avatar:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }
});
const User = mongoose.model("User", userSchema);
export default User