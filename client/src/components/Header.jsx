import React, { useState } from "react";
import {
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode } from "../utils/appSlice";
import DropDownHeader from "./DropDownHeader";

const Header = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false); //open mobile menu in small screens
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const fullName = user?.firstName + " " + user?.lastName;
  const theme = useSelector((store) => store?.app?.mode);
  const dark = theme==="dark"

  const onThemeChange = () => {
    dispatch(setMode());
  };
  
  return (
    <div className="flex items-center justify-between p-4 font-rubik w-[90%] mx-auto">
      <div className="flex items-center justify-between w-[31rem]">
        <p
          className="font-bold text-3xl text-[#068af5] hover:text-[#065ef5] cursor-pointer"
          onClick={() => {
            navigate("/home");
          }}
        >
          Sociopedia
        </p>
        {isNonMobileScreens && (
          <div className={"flex items-center justify-between  gap-6 rounded-lg px-4 py-1 " +(dark ? "bg-[#3f3f3f]" : "bg-[#f1efef]")}>
            <input placeholder="Search..." className={"outline-none "+ (dark ? "text-white bg-[#3f3f3f] ":"bg-[#f1efef]")}/>
            <IconButton>
              <Search className={dark? "text-white":""}/>
            </IconButton>
          </div>
        )}
      </div>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <div className="flex items-center justify-between gap-7">
          <IconButton onClick={onThemeChange} className="">
            {dark ? (
              <LightMode className={dark? "text-white":""} sx={{ fontSize: "1.2rem" }} />
            ) : (
              <DarkMode className={"text-black"} sx={{ fontSize: "1.2rem" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "1.5rem" }} />
          <Notifications sx={{ fontSize: "1.5rem" }} />
          <Help sx={{ fontSize: "1.5rem" }} />
        
          <DropDownHeader/>
        </div>
      ) : (
        <IconButton
          onClick={() => {
            setIsMobileMenuToggled(!isMobileMenuToggled);
          }}
        >
          <Menu className={dark ? "text-white":"text-black"}/>
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled ? <div className={"fixed right-0 bottom-0 h-[100%] z-10 max-w-[500px] min-w-[300px] bg-[#f2f3f8] " + (dark ? "bg-[#181816]" :"")}>
        <div className="flex justify-end p-4">
        <IconButton  onClick={() => {
            setIsMobileMenuToggled(!isMobileMenuToggled);
          }}>
            <Close  className={dark ? "text-white":"text-black"}/>
          </IconButton>
        </div>

        {/* MENU ITEMS */}
        <div className="flex flex-col items-center justify-between gap-12 ">
        <IconButton onClick={onThemeChange} className="">
            {dark ? (
              <LightMode className={dark? "text-white":""} sx={{ fontSize: "1.2rem" }} />
            ) : (
              <DarkMode className={"text-black"} sx={{ fontSize: "1.2rem" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "1.5rem" }} />
          <Notifications sx={{ fontSize: "1.5rem" }} />
          <Help sx={{ fontSize: "1.5rem" }} />
          <DropDownHeader/>
        </div>
      </div>: ""}
    </div>
  );
};

export default Header;
