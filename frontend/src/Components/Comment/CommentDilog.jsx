import { Dialog, DialogContent } from "@mui/material";
import React from "react";

const CommentDilog = ({ opens, setOpens }) => {
  return (
     <Dialog open={opens} onClose={() => setOpens(false)}>
      <DialogContent>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_drZoS4Q2mT2kF-foAfDwu56w2WwrIT-Bvg&s"
          alt="Post_img"
        />
      </DialogContent>
     </Dialog>
  );
};

export default CommentDilog;
