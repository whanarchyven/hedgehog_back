import Posts from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import fileService from "../services/fileService.js";
import posts from "../routes/posts.js";

class PostController {
    //get all posts
    async getAll(req, res) {
        Posts.find()
            .sort({date: -1})
            .then((posts) => res.json(posts))
            .catch((err) => res.status(400).json("error: " + err));
    }

    //add new post
    async create(req, res) {
        const {caption, location, xCoord, yCoord} = req.body;
        console.log(Object.keys(req.files));
        let keys = Object.keys(req.files);
        let totalFileNameArr = [];
        keys.map((key) => {
            const fileName = fileService.saveFile(req.files[key]);
            console.log(req.files[key]);
            totalFileNameArr.push(fileName);
        })
        let totalFileName = totalFileNameArr.join('|');
        console.log(totalFileName);
        console.log(req.user);
        let nick = "";
        User.findById(req.user.id).then((user, err) => {
            if (user) {
                nick = `${user.name} ${user.surname}`;
            }
            let tempExp=user.exp;
            console.log(nick);
            const newPost = new Posts({
                caption,
                image: totalFileName,
                location,
                xCoord,
                yCoord,
                username: req.user.username,
                nickname: nick,
                user: req.user.id
            });
            newPost
                .save()
                .then(() => {
                    User.findByIdAndUpdate(req.user.id, {exp: tempExp+200},).then((res,err)=>{})
                    return res.json("Post Added")
                })
                .catch((err) => res.status(400).json(err));
        });
    }

    //update post
    async updatePost(req, res) {
        try {
            const post = req.body;
            if (!post._id) {
                res.status(400).json({message: "Id не указан"});
            }
            const updatedPost = await Posts.findByIdAndUpdate(post._id, post, {
                new: true,
            });
            return res.status(500).json(post);
        } catch (err) {
            return res.status(400).json({message: "Error"});
        }
    }

    //get post by id
    async getPost(req, res) {
        Posts.findById(req.params.id).then((post, err) => {
            if (err) res.status(400).json("error: " + err);
            else res.status(200).json(post);
        });
    }

    //delete post
    async deletePost(req, res) {
        try {
            const {postId} = req.params.id;
            const post = await Post.findByIdAndDelete(postId);
            return res.status(500).json(post);
        } catch (err) {
            return res.status(400).json({message: "Error"});
        }
    }

    async getComments(req, res) {
        Posts.findById(req.params.id).then((post, err) => {
            if (err) res.status(400).json("error: " + err);
            else res.status(200).json(post.comments);
        });
    }

    async getUserPosts(req, res) {
        Posts.find({username: req.params.username}).then((posts, err) => {
            if (err) res.status(400).json("error: " + err);
            else res.status(200).json(posts);
        });
    }

    //add new comment
    async addComment(req, res) {
        const {content, id} = req.body;
        const user = req.user;
        console.log(req.user);
        let tempExp = 0;

        let nick = "";
        User.findById(req.user.id).then((user, err) => {
            if (user) {
                nick = `${user.name} ${user.surname}`;
            }
            tempExp = user.exp;
            console.log(user.exp);
            const newContent = new Comment({
                content,
                username: user.username,
                nickname: nick,
            });
            newContent.save().then(() => res.json("Comment Added"));
            Posts.findByIdAndUpdate(
                {_id: id},
                {$push: {comments: newContent}}
            ).then((err, data) => {
                User.findByIdAndUpdate(req.user.id, {exp: tempExp+5},).then((res,err)=>{

                })

            });
        });
    }

    async addLike(req, res) {
        const {id} = req.body;
        Posts.findById({_id: id}).then((data, err) => {
            if (err) res.status(400).json("error: " + err);
            else {
                let userLike = data.likes.findIndex((item) => item == req.user.id);

                if (userLike == -1) {
                    let userDislike = data.dislikes.findIndex(
                        (item) => item == req.user.id
                    );

                    if (userDislike != -1) {
                        let temp = data.dislikes.splice(userDislike, 1);
                        if (data.likes.length == 0) {
                            temp = [];
                        }
                        Posts.findByIdAndUpdate(
                            {_id: id},
                            {$set: {dislikes: temp}}
                        ).then(() => {
                        });
                    }

                    Posts.findByIdAndUpdate(
                        {_id: id},
                        {$push: {likes: req.user.id}}
                    ).then(() => {
                        return res.status(200).json("like added");
                    });
                } else {
                    let temp = data.likes.splice(userLike, 1);
                    if (data.likes.length == 0) {
                        temp = [];
                    }
                    console.log(temp);
                    Posts.findByIdAndUpdate({_id: id}, {$set: {likes: temp}}).then(
                        () => {
                            return res.status(200).json("like removed");
                        }
                    );
                }
            }
        });
    }

    async addDislike(req, res) {
        try {
            const {id} = req.body;
            Posts.findById({_id: id}).then((data, err) => {
                if (err) res.status(400).json("error: " + err);
                else {
                    let userLike = data.dislikes.findIndex((item) => item == req.user.id);

                    if (userLike == -1) {
                        let userLike = data.likes.findIndex((item) => item == req.user.id);

                        if (userLike != -1) {
                            let temp = data.likes.splice(userLike, 1);
                            if (data.likes.length == 0) {
                                temp = [];
                            }
                            Posts.findByIdAndUpdate(
                                {_id: id},
                                {$set: {likes: temp}}
                            ).then(() => {
                            });
                        }

                        Posts.findByIdAndUpdate(
                            {_id: id},
                            {$push: {dislikes: req.user.id}}
                        ).then(() => {
                            return res.status(200).json("dislike added");
                        });
                    } else {
                        let temp = data.dislikes.splice(userLike, 1);
                        if (data.dislikes.length == 0) {
                            temp = [];
                        }
                        console.log(temp);
                        Posts.findByIdAndUpdate(
                            {_id: id},
                            {$set: {dislikes: temp}}
                        ).then(() => {
                            return res.status(200).json("dislike removed");
                        });
                    }
                }
            });
        } catch (e) {
        }
    }
}

export default new PostController();
