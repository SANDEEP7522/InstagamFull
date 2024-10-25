import React from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpeg";
import img3 from "../../assets/3.jpeg";
import img4 from "../../assets/4.jpeg";
import img5 from "../../assets/5.jpeg";
import img6 from "../../assets/6.jpg";
import img8 from "../../assets/8.jpg";
import { Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaPaperPlane, FaBookmark } from "react-icons/fa";

function Post() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="post  grid-cols-1 grid-rows-5 gap-4 z-5 h-full items-start  bg-pink-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-200 ">
      <div className=" flex justify-center  items-center m-2 cursor-pointer ">
        <Stack direction="row" spacing={2}>
          <div>
            <Avatar alt="Remy Sharp" src={img1} />
            sandeep
          </div>
          <div>
            <Avatar alt="Remy Sharp" src={img2} />
            sandeep
          </div>
          <div>
            <Avatar alt="Remy Sharp" src={img3} />
            sandeep
          </div>
          <div>
            <Avatar alt="Remy Sharp" src={img4} />
            sandeep
          </div>
          <div>
            <Avatar alt="Remy Sharp" src={img5} />
            sandeep
          </div>
          <div>
            <Avatar alt="Remy Sharp" src={img6} />
            sandeep
          </div>
          <div>
            <Avatar alt="Remy Sharp" src={img8} />
            sandeep
          </div>
        </Stack>
      </div>

      <div className=" justify-center m-[1rem] ">
        <div className="h-full w-full items-start  bg-pink-250 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-200">
          <div className="flex justify-between items-center">
            <Avatar alt="Remy Sharp" src={img1} />
            <div className="grid justify-start items-start ml-[-17rem] ">
              <p className=" flex justify-center m-2 text-lg font-medium  ">
                sandeep
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
          <div className="grid justify-center h-full w-full items-start  bg-pink-180 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-200">
            <img
              className=" rounded-sm my-2 m-full aspect-square object-cover "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_drZoS4Q2mT2kF-foAfDwu56w2WwrIT-Bvg&s"
              alt=""
            />
          </div>
          <div className=" flex items-center justify-between  my-2 ml-2 ">
            <div className=" flex items-center gap-5 cursor-pointer ">
             <FaRegHeart className="cursor-pointer hover:text-red-500"/>
               <FaRegComment className="cursor-pointer hover:text-gray-500   " />
              <FaPaperPlane className="cursor-pointer hover:text-gray-500   " />
            </div> <FaBookmark className="mr-2 cursor-pointer hover:text-gray-500"/>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Post;
