import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import "./creatPost.css";
import { readFileAsDataUrl } from "../lib/utils";
import axios from "axios";




function CreatPost({ open, setOpen }) {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const fileChangeHandler = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataUrl(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (event) => {
     // event.preventDefault();
     //console.log(file, caption);
    
      const formData = new FormData();
      formData.append("caption", caption)// append mean add data
       if (imagePreview) {
        formData.append("image", file)
        
       }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/v1/post/addpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials:true,
      });
     
       if (res.data && res.data.success) {
        alert.success(res.data.success);
        alert.error("Failed to add post. Please try again.");
       }

    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="backdrop-blur-sm bg-opacity-20 "
    >
      <DialogContent>
        <DialogTitle className="text-center font-semibold ">
          Create New Posts{" "}
        </DialogTitle>
        <div className="flex gap-3 items-center">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <div>
            <h1 className=" text-xxl font-semibold ">UserName</h1>
            <span className=" text-xs font-semibold font-sans    ">
              Bio here........
            </span>
          </div>
        </div>
        <TextField
          className=" focus-visible:ring-transparent border-none h-[8rem] w-[27rem]"
          placeholder="Write Cation.........."
          id="outlined-basic"
          label="Write Caption"
          variant="outlined"
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
        />
        {imagePreview && (
          <div className="w-43 h-43 flex items-center justify-center mt-[-4rem]">
            <img src={imagePreview} alt="privies_image" />
          </div>
        )}
        <input
          ref={imageRef}
          onChange={fileChangeHandler}
          type="file"
          className="hidden ml-[-6rem] "
        />
        <Button onClick={() => imageRef.current.click()} variant="contained">
          Select your device
        </Button>
        {imagePreview &&
          (loading ? (
            <CircularProgress color="inherit" />
          ) : (
            <Button
              onClick={createPostHandler}
              variant="contained"
              type="submit"
            >
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
}

export default CreatPost;
