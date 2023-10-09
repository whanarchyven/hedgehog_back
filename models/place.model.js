//comment.model.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    photos: {
        type: String
    },
    description:{
        type:String
    },
    xCoord: {
        type: Number
    },
    yCoord: {
        type: Number
    },
    targetLink:{
      type:String
    },
    posts:[{type: Schema.Types.ObjectId, ref: "Post"}]
});

const Place = mongoose.model("Place", placeSchema);
export default Place