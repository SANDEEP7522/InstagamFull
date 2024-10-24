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
    <div className="post  h-full  grid-cols-1 grid-rows-5 gap-4 ">
      <div className=" flex justify-center items-center m-2 ">
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

      <div className="flex items-center justify-between ">
        <div className="flex justify-start items-center m-3 w-full ">
          <Avatar alt="Remy Sharp" src={img1} />
          <div>
            <p className=" flex justify-center m-2 text-lg font-medium ">
              sandeep <b className="flex justify-between items-center">.</b>10h
            </p>
            <p className=" m-2 mt-[-2vh] text-sm">Original music</p>
          </div>

          <div>
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
              <div className="h-full w-full bg-pink-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
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
        <div className="flex item-center gap-2">
          
        </div>
      </div>



    </div>
  );
}

export default Post;
