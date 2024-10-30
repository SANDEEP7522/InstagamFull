import React, { useState } from "react";
import "./Post.css";
import img1 from "../../assets/1.jpg";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaPaperPlane, FaBookmark } from "react-icons/fa";
import CommentDilog from "../Comment/CommentDilog";
import Story from "../Status/Story";
import PostHeader from "./postHeader";

function Post() {
  const [text, setText] = useState("");
  const [opens, setOpens] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  // when u write comment post button show
  const changeEventHandler = (event) => {
    const inputText = event.target.value;
    setText(inputText.trim() ? inputText : "");
  };

  return (
    <div className="post  grid-cols-1 grid-rows-5 gap-4 z-5 h-full items-start  bg-pink-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-200 ">
      <Story />

      <div className=" justify-center m-[1rem] ">
        <div className="h-full w-full items-start  bg-pink-250 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-200">

          <PostHeader/>
          <div className="grid justify-center h-full w-full items-start  bg-pink-180 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-200">
            <img
              className=" rounded-sm my-2 m-full aspect-square object-cover "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_drZoS4Q2mT2kF-foAfDwu56w2WwrIT-Bvg&s"
              alt="Post_img"
            />
          </div>
          <div className=" flex items-center justify-between  my-2 ml-2 ">
            <div className=" flex items-center gap-5 cursor-pointer ">
              <FaRegHeart className="cursor-pointer hover:text-red-500" />

              <FaRegComment
                onClick={() => {
                  console.log("Comment icon clicked");
                  setOpens(true);
                }}
                className="cursor-pointer hover:text-gray-500"
              />

              <FaPaperPlane className="cursor-pointer hover:text-gray-500   " />
            </div>
            <FaBookmark className="mr-2 cursor-pointer hover:text-gray-500" />
          </div>

          <span className=" font-medium mr-2 ml-2">1k Like</span>
          <p>
            <span className=" font-medium mr-2 ml-2">username</span>caption
          </p>

          <span
            onClick={() => setOpens(true)}
            className="  mr-2 ml-2 m-2 mt-[-2vh] text-sm cursor-pointer "
          >
            View all 10 comments
          </span>
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
              <span className="text-blue-500 cursor-pointer ">Post</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Post;
