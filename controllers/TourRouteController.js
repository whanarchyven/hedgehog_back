
import fileService from "../services/fileService.js";

import TourRoute from "../models/tourRoute.model.js";

import Place from "../models/place.model.js";
import Posts from "../models/post.model.js";


class TourRouteController {

    async getRoutes(req,res){
        TourRoute.find()
            .sort({date: -1})
            .then((posts) => res.json(posts))
            .catch((err) => res.status(400).json("error: " + err));
    }
    async create(req,res){
        const {name, description, photo}=req.body;
        let keys = Object.keys(req.files);
        let totalFileNameArr = [];
        keys.map((key) => {
            const fileName = fileService.saveFile(req.files[key]);
            console.log(req.files[key]);
            totalFileNameArr.push(fileName);
        })
        let totalFileName = totalFileNameArr.join('|');

        const newTourRoute = new TourRoute({
            name,
            photo: totalFileName,
            description,
        });
        newTourRoute
            .save()
            .then(() => {
                return res.json("Tour Route Added")
            })
            .catch((err) => res.status(400).json(err));


    }

    async getRoute(req,res){
        TourRoute.findById(req.params.id).then((post, err) => {
            if (err) res.status(400).json("error: " + err);
            else res.status(200).json(post);
        });
    }


    async addPlace(req, res) {
        const {id} = req.body;

        Place.findById(id).then((place, err) => {
            TourRoute.findByIdAndUpdate(
                {_id: req.params.id},
                {$push: {places: place}}
            ).then((err, data) => {
                return res.json("Place added to a route")
            });
        });
    }


}

export default new TourRouteController();
