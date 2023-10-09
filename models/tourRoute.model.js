//comment.model.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tourRouteSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String
    },
    description:{
        type:String
    },
    places:[{type: Schema.Types.ObjectId, ref: "Place"}]
});

const TourRoute = mongoose.model("TourRoute", tourRouteSchema);
export default TourRoute