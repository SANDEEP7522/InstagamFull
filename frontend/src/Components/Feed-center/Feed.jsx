import React from 'react'
import './Feed.css'
import Post from '../Post/Post';

function Feed() {
  return (
    <div className='flex-1 my-8 flex flex-col items-center pl-[20%]'>
      <Post />
    </div>
  )
}

export default Feed;
