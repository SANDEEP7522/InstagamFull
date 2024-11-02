import { Avatar } from '@mui/material';
import img1 from "../assets/1.jpg";
import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile() {
  const params = useParams();
  const userId = params.Id;
  useGetUserProfile(userId);

  const {userProfile} = useSelector(store => store.auth)
  console.log(userProfile );
  

  return (
    <div>
     <Avatar 
        src={userProfile?.profilePicture} alt= "profilephoto"
          />
    </div>
  )
}

export default Profile;
