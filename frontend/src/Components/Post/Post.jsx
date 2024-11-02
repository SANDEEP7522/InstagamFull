import React, { useState } from "react";
import "./Post.css";
import img1 from "../../assets/1.jpg";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FaRegHeart } from "react-icons/fa";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FaRegComment } from "react-icons/fa";
import { FaPaperPlane, FaBookmark } from "react-icons/fa";
import CommentDilog from "../Comment/CommentDilog";
import Story from "../Status/Story";
import PostHeader from "./postHeader";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSelectedPost } from "../../Redux/postSlice";

function Post({ post }) {
  const [text, setText] = useState("");
  const [opens, setOpens] = useState(false);
  // const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  // const [postLike, setPostLike] = useState(post.likes.length);
  // const [comment, setComment] = useState(post.comments)
  const dispatch = useDispatch();

  // when u write comment post button show
  const changeEventHandler = (event) => {
    const inputText = event.target.value;
    setText(inputText.trim() ? inputText : "");
  };

  // like and dislike function
  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "disliked" : "like";
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/${action}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes); // fir update the likes
        setLiked(!liked); // after like value true

        // post update after like or dislike
        const updatePostData = posts.map((po) =>
          po._id == post._id
            ? {
                ...po, // po = all post without kikes and stck here all old value
                likes: liked
                  ? po.likes.filter((id) => id !== user._id)
                  : [...po.likes, user._id], // if anyone like your post then add the liker id
              }
            : po
        );
        dispatch(setPosts(updatePostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("like or dislike error", error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
    //  console.log(res.data);
      
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData); // coment updated

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPost(updatedPostData));

        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log("comment error", error);
    }
  };

  return (
    <div className="post  grid-cols-1 grid-rows-5 gap-4 z-5 h-full items-start  bg-pink-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-200 ">
      <Story />

      <div className=" justify-center m-[1rem] ">
        <div className="h-full w-full items-start  bg-pink-250 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-200">
          <PostHeader />
          <div className="grid justify-center h-full w-full items-start  bg-pink-180 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-200">
            <img
              className=" rounded-sm my-2 m-full aspect-square object-cover "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_drZoS4Q2mT2kF-foAfDwu56w2WwrIT-Bvg&s"
              alt="Post_img"
            />
          </div>
          <div className=" flex items-center justify-between  my-2 ml-2 ">
            <div className=" flex items-center gap-5 cursor-pointer ">
              {/* {
                liked ? <FavoriteIcon onClick={likeOrDislikeHandler} style={{ color: 'red' }} />:
              <FaRegHeart
                onClick={likeOrDislikeHandler}
                className="cursor-pointer hover:text-red-500"
              />

              } */}
              <FaRegHeart
                onClick={likeOrDislikeHandler}
                className="cursor-pointer hover:text-red-500"
              />
              <FaRegComment
                onClick={() => {
                  dispatch(setSelectedPost(post));
                  setOpens(true);
                }}
                className="cursor-pointer hover:text-gray-500"
              />

              <FaPaperPlane className="cursor-pointer hover:text-gray-500   " />
            </div>
            <FaBookmark className="mr-2 cursor-pointer hover:text-gray-500" />
          </div>

          <span className=" font-medium mr-2 ml-2">Like</span>
          {/* <span className=" font-medium mr-2 ml-2">{updatedLikes}</span> */}
          <p>
            <span className=" font-medium mr-2 ml-2">post</span>caption
          </p>
          {/* <p>
            <span className=" font-medium mr-2 ml-2">{post.author?.username }</span>{post.caption}
          </p> */}
            

            
          {/* {
            comment.length >= 0 && (
              <span
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpens(true);
            }}
            className="  mr-2 ml-2 m-2 mt-[-2vh] text-sm cursor-pointer "
          >
           <p>View all {comment.length} comments</p>
            View all 1k comments
          </span >
            )   
          } */}
           view all 1k cin this commnet
      
          <CommentDilog opens={opens} setOpens={setOpens} />

          <div className="flex  items-center gap-2 ">
            <input
              type="text"
              placeholder="Add comments....."
              value={text}
              onChange={changeEventHandler}
              className=" outline-none text-sm w-[70%] bg-[#eac3ea] "
            />
            {text && (
              <span
                onClick={commentHandler}
                className="text-blue-500 cursor-pointer "
              >
                Post
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
