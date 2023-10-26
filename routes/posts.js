//post.js
import Router from "express"
import auth from "../middleware/auth.js";
import PostController from "../controllers/PostController.js";

const postsRouter=new Router()

// get all post
postsRouter.get("/", PostController.getAll);

// get a post
postsRouter.route("/:id").get(auth, PostController.getPost);

// add a new post
postsRouter.route("/add/").post(auth, PostController.create);
//update post
postsRouter.route('/update/').patch(auth, PostController.updatePost)
//delete post
postsRouter.route('/delete/:id').delete(auth, PostController.deletePost)


//add a comment
postsRouter.route("/add-comment/").post(auth, PostController.addComment);
// get all comments for a post
postsRouter.route("/comments/:id").get(auth, PostController.getComments);


postsRouter.route("/add-like").post(auth,PostController.addLike)

postsRouter.route("/add-dislike").post(auth,PostController.addDislike)

postsRouter.route("/user/:username").get(auth, PostController.getUserPosts);

export default postsRouter