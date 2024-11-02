import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SuggestedUser() {
  const { suggestedUsers } = useSelector((store) => store.auth);
  
  // if u have no suggestedUser then 
  if (!Array.isArray(suggestedUsers)) {
    return <div>No suggested users available.</div>;
  }

  return (
    <div className="my-8">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-medium cursor-pointer">Suggested for you</h1>
        <span className="font-medium cursor-pointer mr-5">See all</span>
      </div>

      {
       suggestedUsers.map((user) => {
        return (
          <div key={user._id}>
            <div className="flex items-center gap-2 mr-[10rem] mt-4">
              <Link to={`/profile/${user?._id}`}>
                <Avatar alt="post_image" src={user?.profilePicture} />
              </Link>
              <div className=" items-center gap-2 ">
                <h1 className=" font-semibold text-sm ">
                  <Link to={`/profile/${user?._id}`}> {user?.username} </Link>
                  {/* <p>sandeep</p> */}
                </h1>
                <span className=" font-semibold text-sm ">
                  {user?.bio || "Bio here..."}
                </span>
              </div>
              <button className="cursor-pointer text-[#6767e7]  ml-8 hover:text-[#0606f1]">
                Follow
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SuggestedUser;
