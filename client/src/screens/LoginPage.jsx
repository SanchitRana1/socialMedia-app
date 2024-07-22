import { useMediaQuery } from "@mui/material";
import React from "react";
import Form from "../components/Form";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useSelector((store)=>store?.app?.mode)
  return (
    <div className="text-black">
      <div className={"bg-[#fffffffe] form p-6 my-8 mx-auto rounded-lg "+(isNonMobileScreens ? "w-[50%]" :"w-[100%]")}>
        <p className="font-medium text-xl text-center mb-8">Welcome to SocioPedia </p>
        <Form />
      </div>
    </div>
  );
};

export default LoginPage;
