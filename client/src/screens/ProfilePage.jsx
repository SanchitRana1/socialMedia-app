import { useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import UserWidget from '../components/UserWidget';
import MyPostWidget from '../components/MyPostWidget';
import PostsWidget from '../components/PostsWidget';
import AdvertWidget from '../components/AdvertWidget';
import FriendListWidget from '../components/FriendListWidget';
import { useParams } from 'react-router-dom';
import { USERS_API } from '../utils/constants';

const ProfilePage = () => {
  const [user,setUser] = useState(null)
  const {userId} = useParams();
  const { token} = useSelector((store) => store?.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); 
  const { _id, picturePath } = useSelector((store) => store?.user?.user);

  const getUser = async () => {
    const response = await fetch(`${USERS_API}/${userId}` , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const {data} = await response.json();
    console.log(data)
    setUser(data);
  };

  useEffect(()=>{
    getUser()
  },[])

  return (
    <div className="w-full">
      <div
        className={`w-full py-8 px-[5%] gap-8 justify-center ${isNonMobileScreens ? 'flex flex-row' : 'block'}`}
      >
        <div className={isNonMobileScreens ? 'basis-[26%]' : 'w-full'}>
          <UserWidget userId={userId} picturePath={user?.picturePath} />
          
          <FriendListWidget userId={userId}/>
        </div>

        <div
          className={`${isNonMobileScreens ? 'basis-[50%]' : 'w-full mt-8'}`}
        >
          <MyPostWidget picturePath={picturePath}/>
          <PostsWidget userId={userId} isProfile/>
        </div>
        
      </div>
    </div>
  )
}

export default ProfilePage