import React from 'react'
import Stack from "@mui/material/Stack";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpeg";
import img3 from "../../assets/3.jpeg";
import img4 from "../../assets/4.jpeg";
import img5 from "../../assets/5.jpeg";
import img6 from "../../assets/6.jpg";
import img8 from "../../assets/8.jpg";
import { Avatar } from '@mui/material';

function Story() {
  return (
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

  )
}

export default Story
