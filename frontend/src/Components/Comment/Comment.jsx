import { Avatar } from "@mui/material";
import React from "react";

function Comment({ comment }) {
  return (
    <div className="my-2">
      <div className="flex gap-2 items-center">
        <Avatar
          src={comment?.author?.profilePicture ? src : undefined}
          alt={alt}
          onError={handleError}
          sx={{ width: 56, height: 56 }}
        >
          {imgError ? fallbackIcon : alt.charAt(0)}

          <h1 className="font-bold text-sm" >{comment?.author.username} <span className=" font-normal pl-1 ">{comment?.text}</span> </h1>
        </Avatar>
      </div>
    </div>
  );
}

export default Comment;
