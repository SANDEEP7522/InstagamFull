import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import img1 from "../../assets/1.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";  
import { useDispatch, useSelector } from "react-redux";

function PostHeader( {post} ) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {user} = useSelector(store =>store.auth)
  const {posts} = useSelector(store => store.post);
  const dispatch = useDispatch();

  const handleClick = (event) => { 
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${post?._id}`,
         { withCredentials: true } );
      
        if(res.data.success){
         const updatedPostDate = post.filter((postItem) => postItem?._id !== post?._id); // filter deleted id 
         dispatch(setPosts(updatedPostDate));//  update post after deleted 
         alert.success(res.data.message);
        }
    } catch (error) {
      console.log("delete post error", error);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <Avatar alt="Remy Sharp" src={img1} />
      {/* <Avatar alt="Remy Sharp" src={post.author?.profilePicture} /> */}
      <div className="grid justify-start items-start ml-[-17rem] ">
        <p className=" flex justify-center m-2 text-lg font-medium  ">
          sandeep
          {/* {post.author?.username} */}
          <b>.</b>
          <p className=" text-[small] font-[serif] "> 10h</p>
        </p>
        <p className=" m-2 mt-[-2vh] text-sm  ">Original music</p>
      </div>
      <div className="flex justify-start items-center ">
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
            {
              user && user?._id === post?.author._id &&
             <MenuItem  onClick={deletePostHandler}>Delete</MenuItem>
             }
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
  );
}

export default PostHeader;
