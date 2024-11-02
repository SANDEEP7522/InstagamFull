import React from "react";
import "./RightsideBar.css";
import { Avatar, Link } from "@mui/material";
import img1 from "../../assets/1.jpg";

import { useSelector } from "react-redux";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

function RightsideBar() {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="right w-fit my-10 ">
      <div className="flex items-center gap-2 mr-[10rem] mt-4">
        <Link to={`/profile/${user?._id}`}>
          <Avatar alt="Remy Sharp" src={img1} />
        </Link>
        <div className=" items-center gap-2 ">
          <h1 className=" font-semibold text-sm ">
            <Link to={`/profile/${user?._id}`}> {user?.username} </Link>
            <p>sandeep</p>{" "}
          </h1>
          <span className=" font-semibold text-sm ">
            {user?.bio || "Bio here..."}
          </span>
        </div>
        <button className="cursor-pointer text-[#0606f1] ml-8">Switch</button>
      </div>
      <SuggestedUser/>
    </div>
  );
}

export default RightsideBar;
