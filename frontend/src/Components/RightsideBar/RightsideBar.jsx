import React from "react";
import "./RightsideBar.css";
import { Avatar, Link } from "@mui/material";
import img1 from "../../assets/1.jpg";

import { useDispatch, useSelector } from "react-redux";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";
import axios from "axios";
import { setAuthUser } from "../../Redux/authSlice";
import { setPosts, setSelectedPost } from "../../Redux/postSlice";
import { useNavigate } from "react-router-dom";



function RightsideBar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null)); // sending a message to your app saying, "Hey, something has changed!" 
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        alert(res.data.success)
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="right w-fit my-10 ">
      <div className="flex items-center gap-2 mr-[10rem] mt-4">
        <Link to={`/profile/${user?._id}`}>
          <Avatar alt="Remy Sharp"
          // src={user?.posfilePictuture} alt = 'post_image' 
          src={img1} 
          />
        </Link>
        <div className=" items-center gap-2 ">
          <h1 className=" font-semibold text-sm "
          to={`/profile/${user?._id}`}> {user?.username} 
          </h1>
          <span className=" font-semibold text-sm ">
            {user?.bio || "Bio here..."}
          </span>
        </div>
        <button onClick={logoutHandler} className="cursor-pointer text-[#0606f1] ml-8">logout</button>
      </div>
      <SuggestedUser/>
    </div>
  );
}

export default RightsideBar;
