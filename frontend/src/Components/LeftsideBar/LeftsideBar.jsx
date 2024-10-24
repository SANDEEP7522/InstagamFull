import React from "react";
import "./LeftsideBar.css"
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { Avatar } from "@mui/material";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";

const sidebarItem = [ 
   
  { icon: <Home />, text: "Home" },
  { icon: <Search />, text: "Search" },
  { icon: <TrendingUp />, text: "TrendingUp" },
  { icon: <MessageCircle />, text: "Chat" },
  { icon: <Heart />, text: "Heart" },
  { icon: <PlusSquare />, text: "Creat" },
  {
    icon: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    text: "Profile",
  },
  { icon: <LogOut />, text: "Logout" },
];

function LeftsideBar() {
    const navigate = useNavigate();

  const logoutHandler = async () => {
    
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        alert(res.data.success)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    }
  };
  return (
    <div className="bg-gradient-to-r from-cyan-300 to-blue-300">
      <div className=" flex top-2 z-10 px-3 left-0 h-screen w-[15%] bg-pink-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-200 ">
        <div className=" flex flex-col">
          <h1 className="flex font-bold text-2xl m-3 ">Instagram</h1>
          {sidebarItem.map((item, index) => {
            return (
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex items-center m-2 relative hover:bg-gray-400 cursor-pointer rounded-lg p-2 gap-3 my-3 "
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
       </div> 
    </div>
  );
}

export default LeftsideBar;
