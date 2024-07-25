import React from "react";
import UserWidget from "../components/UserWidget";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import MyPostWidget from "../components/MyPostWidget";
import PostsWidget from "../components/PostsWidget";
import AdvertWidget from "../components/AdvertWidget";
import FriendListWidget from "../components/FriendListWidget";


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((store) => store?.user?.user);

  return (
    <div className="w-full">
      <div
        className={`w-full py-8 px-[5%] gap-2 justify-between ${isNonMobileScreens ? 'flex flex-row' : 'block'}`}
      >
        <div className={isNonMobileScreens ? 'basis-[26%]' : 'w-full'}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>

        <div
          className={`${isNonMobileScreens ? 'basis-[42%]' : 'w-full mt-8'}`}
        >
          <MyPostWidget picturePath={picturePath}/>
          <PostsWidget/>
        </div>
        {isNonMobileScreens && <div className="basis-[25%]">
          <AdvertWidget/>
          <FriendListWidget userId={_id}/>
          </div>}
      </div>
    </div>
  );
};

export default HomePage;
