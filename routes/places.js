//post.js
import Router from "express"
import auth from "../middleware/auth.js";
import PlaceController from "../controllers/PlaceController.js";

const placesRouter=new Router()

// add a new post
placesRouter.route("/create/").post(PlaceController.create);
placesRouter.route("/:id").get(PlaceController.getPlace);

export default placesRouter;