import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { setMode } from "../utils/appSlice";

const DropDownHeader = () => {
  const user = useSelector((store) => store?.user?.user);
  const fullName = user?.firstName + " " + user?.lastName;
  const theme = useSelector((store) => store?.app?.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const textPrimary =
    theme === "dark" ? "bg-[#3f3f3f] text-white" : "bg-[#f1efef]";
  const [drop, setDrop] = useState(false);
  const onLogout = () => {
    if (theme === "dark") {
      dispatch(setMode());
    }
    dispatch(setLogout());
  };
  return (
    <div
      className={"flex flex-col cursor-pointer "}
      onClick={() => {
        setDrop(!drop);
      }}
    >
      <div
        className={`flex justify-center items-center rounded-md ${textPrimary}`}
      >
        <input
          type="text"
          className={`w-[7.5rem] outline-none rounded-md px-2 py-1  ${textPrimary}`}
          value={user ? fullName : ""}
          readOnly
        />
        {!drop ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
      </div>
      {drop && (
        <div
          className={`rounded-b-md absolute mt-7 w-[9rem] py-2 flex flex-col items-center justify-center ${textPrimary}`}
        >
          <p
            className=""
            onClick={() => {
              navigate(`/profile/${user?._id}`);
            }}
          >
            {user && fullName}
          </p>
          <p onClick={onLogout}>Logout</p>
        </div>
      )}
    </div>
  );
};

export default DropDownHeader;
