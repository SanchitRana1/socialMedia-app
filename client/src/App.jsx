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
    <div className={theme==="dark" ? "bg-[#252525] text-white" : ""}>
      <BrowserRouter>
      <Header/>
      <main className={"sm:p-8 px-4 py-8 w-full bg-[#f2f3f8] min-h-[calc(100vh-73px)] " + (theme==="dark" ? "bg-[#181717] text-white":"")}>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/home" element={isAuth  ? <HomePage/> : <Navigate to={"/"}/>}/>
          <Route path="/profile/:userId" element={ isAuth  ? <ProfilePage/> : <Navigate to={"/"}/>} />
        </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
