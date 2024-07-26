import React, { useEffect, useState } from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import UserImage from "./UserImage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USERS_API } from "../utils/constants";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((store) => store?.user?.token);
  const currentUser = useSelector((store) => store?.user?.user)
  const theme = useSelector((store)=>store?.app?.mode)
  const textPrimary = theme==="dark" ? "text-[#f2f2f2]" : "text-[#404040]"
  const textMedium = theme==="dark" ? "text-[#c9c9c9]" : "text-[gray]"
  const navigate = useNavigate();

  const getUser = async () => {
    const response = await fetch(`${USERS_API}/` + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [currentUser]);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    friends,
    location,
    occupation,
    viewedProfile,
    impressions,
  } = user.data;



  return (
    <div className={`w-full px-[1.5rem] pt-[1.5rem] pb-[1rem] rounded-lg ${theme==="dark" ? "bg-[#404040] text-[#ffffff]":"bg-[#ffffff]"}`}>
      {/* FIRST ROW */}
      <div
        className={`flex items-center justify-between gap-2 pb-[1rem]`}
        onClick={() => {
          navigate("/profile/" + userId);
        }}
      >
        <div className="flex items-center justify-between">
          <UserImage image={picturePath} />
          <div>
            <p className="text-xl font-semibold cursor-pointer">
              {firstName} {lastName}
            </p>
            <p>{friends?.length} friends</p>
          </div>
        </div>
        <ManageAccountsOutlined fontSize="medium"/>
      </div>
      <hr />

      {/* SECOND ROW */}
      <div className={`py-2 flex w-full justify-center flex-col  ${textPrimary}`} >
        <div className={`flex py-1 px-2  items-center gap-2 mb-1`}>
          <LocationOnOutlined fontSize="medium" className={``} />
          <p className={`${textMedium}`}>{location}</p>
        </div>
        <div className={`flex py-1 px-2 items-center gap-2 mb-1`}>
          <WorkOutlineOutlined fontSize="medium"/>
          <p className={`${textMedium}`}>{occupation}</p>
        </div>
      </div>
      <hr />

      {/* THIRD ROW */}
      <div className="flex py-1 flex-col">
        <div className="flex justify-between items-center py-2">
          <p className={`${textMedium}`}> {"Who's viewed your profile"}</p>
          <p className="color font-semibold">{viewedProfile}</p>
        </div>
        <div className="flex justify-between items-center py-2">
          <p className={`${textMedium}`}> {"Impressions of your posts"}</p>
          <p className="color font-semibold">{impressions}</p>
        </div>
      </div>
      <hr />

      <div className="py-4">
        <p className={`text-md font-bold mb-4 ${textPrimary}`}>{"Social Profiles"}</p>
        <div className="flex justify-between items-center mb-2 gap-4">
          <div className="flex justify-between items-center mb-2 gap-4">
            <img className=" " src="../assets/twitter.png" alt="" />
            <div className="">
              <p className={`font-semibold ${textPrimary}`}>Twitter</p>
              <p className={`${textMedium}`}>Social Network</p>
            </div>
          </div>
          <EditOutlined fontSize="small"/>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex justify-between items-center mb-2 gap-4">
            <img className=" " src="../assets/linkedin.png" alt="" />
            <div className="">
              <p className={`font-semibold ${textPrimary}`}>LinkedIn</p>
              <p className={`${textMedium}`}>Network Platform</p>
            </div>
          </div>
          <EditOutlined fontSize="small"/>
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
