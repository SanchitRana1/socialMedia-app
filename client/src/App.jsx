import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import HomePage from "./screens/HomePage";
import ProfilePage from "./screens/ProfilePage";
import Header from "./components/Header";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((store)=>store?.app?.mode)
  const isAuth = Boolean(useSelector((store)=>store?.user?.token))
  
  return (
    <div className={`font-rubik ${theme==="dark" ? "bg-[#2e2e2e] text-[#ffffff]" : ""}`}>
      <BrowserRouter>
      <Header/>
      <main
          className={`sm:p-8 md:px-1 md:py-8 w-full min-h-[calc(100vh-73px)] ${theme === "dark" ? "bg-[#1b1b1b] text-white" : "bg-[#f2f2f2] text-black"}`}
        >
        <Routes>
          <Route path="/" element={!isAuth ? <LoginPage/> : <Navigate to={"/home"}/>}/>
          <Route path="/home" element={isAuth  ? <HomePage/> : <Navigate to={"/"}/>}/>
          <Route path="/profile/:userId" element={ isAuth  ? <ProfilePage/> : <Navigate to={"/"}/>} />
        </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}  

export default App;
