//post.js
import Router from "express"
import auth from "../middleware/auth.js";
import PlaceController from "../controllers/PlaceController.js";
import TourRouteController from "../controllers/TourRouteController.js";
import PostController from "../controllers/PostController.js";
import postsRouter from "./posts.js";

const tourRoutesRouter=new Router()

tourRoutesRouter.route("/").get(TourRouteController.getRoutes);
tourRoutesRouter.route("/create/").post(TourRouteController.create);
tourRoutesRouter.route("/:id").get(TourRouteController.getRoute);
tourRoutesRouter.route('/:id/place/add/').post(TourRouteController.addPlace)

export default tourRoutesRouter;