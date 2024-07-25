import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../utils/userSlice";
import { useEffect } from "react";
import Friend from "./Friend";
import { USERS_API } from "../utils/constants";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { _id, friends } = useSelector((store) => store?.user?.user);
  const { token } = useSelector((store) => store?.user);
  console.log(friends);
  const theme = useSelector((store) => store?.app?.mode);

  const getFriends = async () => {
    const response = await fetch(
      `${USERS_API}/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div
      className={`mt-8 px-6 pt-6 pb-3 rounded-md ${
        theme === "dark" ? "bg-[#404040] text-[#ffffff]" : "bg-[#ffffff]"
      }`}
    >
      <p className={`mb-6 text-xl font-medium px-4`}>FriendList</p>
      <div className="flex flex-col gap-6">
        {friends &&
          friends?.map(
            ({ _id, firstName, lastName, occupation, picturePath }) => (
              <Friend
                key={_id}
                friendId={_id}
                name={`${firstName} ${lastName}`}
                subtitle={occupation}
                userPicturePath={picturePath}
              />
            )
          )}
      </div>
    </div>
  );
};

export default FriendListWidget;
