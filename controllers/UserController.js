import User from "../models/user.model.js";
import Posts from "../models/post.model.js";
class UserController{
    async getUser(req, res){
        User.findById(req.params.id).then((post, err) => {
            if (err) res.status(400).json("error: " + err);
            else res.status(200).json(post);
        });
    }
}

export default new UserController();