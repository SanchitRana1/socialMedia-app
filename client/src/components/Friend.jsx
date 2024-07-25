import React from "react";

import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../utils/userSlice";
import UserImage from "./UserImage";

const Friend = ({ firendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { _id, friends } = useSelector((store) => store?.user?.user);
  const { token } = useSelector((store) => store?.user);
  const isFriend = friends?.find((friend) => friend?._id === firendId);
  const theme = useSelector((store) => store?.app?.mode);
  const textPrimary = theme==="dark" ? "text-[#f2f2f2]" : "text-[#404040]"
  const textMedium = theme==="dark" ? "text-[#c9c9c9]" : "text-[gray]"
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${_id}/${firendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start justify-between gap-4">
        <UserImage image={userPicturePath} />
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate(`/profile/${firendId}`);
            navigate(0);
          }}
        >
          <p className={`text-lg font-semibold ${textPrimary}`}>{name}</p>
          <p className={`text-sm text-[#747474] ${textMedium}`}>{subtitle}</p>
        </div>
      </div>
      {_id!==firendId && <button onClick={patchFriend} className="p-3 bg-[#e9e9e9] rounded-full">
        {isFriend ? <PersonRemoveOutlined className={`${theme==="dark"?"text-black":""}`}/> : <PersonAddOutlined className={`text-black`}/>}
      </button>}
      
    </div>
  );
};

export default Friend;
