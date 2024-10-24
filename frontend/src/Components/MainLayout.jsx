import React from 'react'
import { Outlet } from 'react-router-dom';
import LeftsideBar from './LeftsideBar/LeftsideBar';

function MainLayout() {
  return (
    <div>
      <LeftsideBar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout;
