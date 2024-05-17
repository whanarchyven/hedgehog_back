import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import fileService from "../services/fileService.js";
import posts from "../routes/posts.js";
import Place from "../models/place.model.js";
import TourRoute from "../models/tourRoute.model.js";

class PlaceController {
    async create(req,res){
        const {name, description, xCoord, yCoord,targetLink}=req.body;
        let keys = Object.keys(req.files);
        let totalFileNameArr = [];
        keys.map((key) => {
            const fileName = fileService.saveFile(req.files[key]);
            console.log(req.files[key],'FILE');
            totalFileNameArr.push(fileName);
        })
        let totalFileName = totalFileNameArr.join('|');
        console.log(totalFileName,'TOTAL NAME');

        const newPlace = new Place({
            name,
            photos: totalFileName,
            xCoord,
            yCoord,
            targetLink,
            description
        });
        newPlace
            .save()
            .then(() => {
                return res.json("Place Added")
            })
            .catch((err) => res.status(400).json(err));
    }

    async getPlace(req,res){
        Place.findById(req.params.id).then((place, err) => {
            if (err) res.status(400).json("error: " + err);
            else res.status(200).json(place);
        });
    }
}

export default new PlaceController();
