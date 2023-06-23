import Router from "express"
import auth from "../middleware/auth.js";
import Comment from "../models/comment.model.js";

const commentRouter=new Router()

commentRouter.route("/:id").get(auth, (req, res) => {
    Comment.findById(req.params.id).then((comment, err) => {
        if (err) res.status(400).json("error: " + err);
        else res.status(200).json(comment);
    });
});
export default commentRouter