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
// import { useSelector } from "react-redux";
// import { setPosts } from "../../Redux/postSlice";
import { toast } from "react-toastify";

function CreatPost({ open, setOpen }) {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  // const {post} = useSelector(store => store.post)
  // const {user} = useSelector(store => store.auth);
  // const dispatch = dispatch();

  const fileChangeHandler = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataUrl(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (event) => {
    //   event.preventDefault();
    console.log(file, caption);
    if (!caption) {
      toast.error("Caption cannot be empty."); // Ensure alert is defined
      return;
    }
    const formData = new FormData();
    formData.append("caption", caption); // append mean add data
    if (imagePreview) {
      formData.append("image", file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/post/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      //   console.log("Response from server:", res);

      if (res.data && res.data.success) {
        //  dispatch(setPosts([ res.data.post, ...posts]));// [old] -> [old, new]
        toast.success(res.data.success);
        //   setOpen(flase);
      } else {
        console.log("Failed response data:", res.data);
        toast.error("Failed to add post. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error response:",
        error.response ? error.response.data : error
      );
    } finally {
      setLoading(false);
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
          {/* <Avatar alt="Remy Sharp" src={user?.profilePicture} /> */}
          <div>
            {/* <h1 className=" text-xxl font-semibold ">{user?.username}</h1> */}
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
              disabled={loading}
            >
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
}

export default CreatPost;
