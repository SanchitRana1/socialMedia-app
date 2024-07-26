import React, { useState } from "react";

import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../utils/userSlice";
import UserImage from "./UserImage";
import { USERS_API } from "../utils/constants";
import Loader from "./Loader";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id, friends } = useSelector((store) => store?.user?.user);
  const { token, user } = useSelector((store) => store?.user);
  const isFriend = friends?.find((friend) => friend?._id === friendId);
  const theme = useSelector((store) => store?.app?.mode);

  const [loading, setLoading] = useState(false);
  const textPrimary = theme === "dark" ? "text-[#f2f2f2]" : "text-[#404040]";
  const textMedium = theme === "dark" ? "text-[#c9c9c9]" : "text-[gray]";
  const patchFriend = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${USERS_API}/${_id}/${friendId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
    
  };

  return (
    <div className="flex items-start justify-between">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-start justify-between gap-4">
            <UserImage image={userPicturePath} />
            <div
              className="cursor-pointer"
              onClick={() => {
                navigate(`/profile/${friendId}`);
                // navigate(0);
              }}
            >
              <p className={`text-lg font-semibold ${textPrimary}`}>{name}</p>
              <p className={`text-sm text-[#747474] ${textMedium}`}>
                {subtitle}
              </p>
            </div>
          </div>
          {_id !== friendId && (
            <button
              onClick={patchFriend}
              className="p-3 bg-[#e9e9e9] rounded-full"
            >
              {isFriend ? (
                <PersonRemoveOutlined
                  className={`${theme === "dark" ? "text-black" : ""}`}
                />
              ) : (
                <PersonAddOutlined className={`text-black`} />
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Friend;
