import React from 'react'
import Feed from './Feed-center/Feed';
import { Outlet } from 'react-router-dom';
import RightsideBar from './RightsideBar/RightsideBar';
import useGetAllPost from '../Hooks/useGetAllPost';
import useGetSuggestedUsers from '../Hooks/useGetSuggestedUsers';


function Home() {
  useGetAllPost();
  useGetSuggestedUsers
  return (
    <div className='flex'>
      <div className='flex-grow' >
         <Feed />
         <Outlet />
      </div>
      <RightsideBar/>
    </div>
  )
} 

export default Home;
