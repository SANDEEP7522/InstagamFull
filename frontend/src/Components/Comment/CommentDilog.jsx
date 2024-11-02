import { Avatar, Button, Dialog, Link, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostHeader from "../Post/postHeader";
import img1 from "../../assets/1.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setPosts } from "../../Redux/postSlice";

const CommentDilog = ({ opens, setOpens }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [text, setText] = useState("");
  const {selectedPost, posts} = useSelector(store => store.post); 
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch()


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 useEffect(() => {
  if (selectedPost) {
    setComment(selectedPost.comment);
  }
 })


  const changeEventHandler = (event) => {
    const inputText = event.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  // const changeMessageHandler = async () => {
  //   alert(text);
  // };
  
  const sendMessageHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${selectedPost._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
  
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData); // coment updated

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));

        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log("comment error", error);
    }
  };



  return (
    <Dialog
      open={opens}
      onClose={() => setOpens(false)}
      className="backdrop-blur-sm bg-opacity-20 "
    >
      {/* <DialogContent> */}
      <div className="grid grid-cols-2 grid-rows-1 ">
        {/* post image open */}
        <div className="flex justify-between ">
          <img
            className="w-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_drZoS4Q2mT2kF-foAfDwu56w2WwrIT-Bvg&s"
            // src = {selectedPost?.image}
            alt="Post_img"
          />
        </div>
        <div className=" justify-between mt-1 ">
          <div className="flex justify-center gap-5 ">
            <Link>
              <Avatar
                alt="Remy Sharp"
                src={img1}
                // src={selectedPost?.author?.profilePicture}
                className="flex justify-center  mt-1 ml-0 cursor-pointer"
              />
            </Link>
            <div className="grid justify-start items-start">
              <Link className="text-none cursor-pointer ">
                <p className=" flex justify-center mt-[0.2vh] text-lg font-medium ml-[-0.5rem] ">
                  {/* {selectedPost?.author?.username} */}
                  sandeep
                  <b>.</b>
                  <p className=" text-[small] font-[serif] "> 10h</p>
                </p>
              </Link>
            </div>
            <div className=" ">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
               >
                <div className="grid justify-center h-full w-full items-start  bg-pink-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-200">
                  <MenuItem onClick={handleClose}>Report</MenuItem>
                  <MenuItem onClick={handleClose}>Unfollow</MenuItem>
                  <MenuItem onClick={handleClose}>Add to Favavoritest</MenuItem>
                  <MenuItem onClick={handleClose}>Go to post</MenuItem>
                  <MenuItem onClick={handleClose}>Shere to...</MenuItem>
                  <MenuItem onClick={handleClose}>Copy link</MenuItem>
                  <MenuItem onClick={handleClose}>Embed</MenuItem>
                  <MenuItem onClick={handleClose}>About this account</MenuItem>
                  <MenuItem onClick={handleClose}>Cancle</MenuItem>
                </div>
              </Menu>
            </div>
          </div>
          <div className="relative">
            <div className="flex-1 overflow-y-auto h-96 w-full p-4 break-words ">
              {/* {
              comment?.comments.map((comment) => <p key={comment._id} comment ={comment} />)
              } */}
             <p>sandeep kumar Sahu</p> 
            </div>
            <div className="p-4 ">
              <div className=" flex items-center gap-1 ">
                <input
                  onChange={changeEventHandler}
                  value={text}
                  type="text"
                  placeholder="Add comment..."
                  className="w-full outline-none border border-gray-300 "
                />
                <button disabled={!text.trim()} onClick={sendMessageHandler}>
                  send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </DialogContent> */}
    </Dialog>
  );
};

export default CommentDilog;
