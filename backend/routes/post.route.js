import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addComment, addNewPost, deletePost, dislikePost, getAllPost, getCommentPost, getUserPost, likePost, postBookmark } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/addpost").post(isAuthenticated, upload.single('image'),addNewPost);
router.route("/all").post(isAuthenticated, getAllPost);
router.route("/userpost/all").post(isAuthenticated, getUserPost);
router.route("/:id/like").post(isAuthenticated, likePost);
router.route("/:id/comment").post(isAuthenticated, addComment);
router.route("/:id/dislike").post(isAuthenticated, dislikePost);
router.route("/:id/comment/all").post(isAuthenticated, getCommentPost);
router.route("/delete/:id").post(isAuthenticated, deletePost);
router.route("/:id/bookmark").post(isAuthenticated, postBookmark);
    
export default router;
