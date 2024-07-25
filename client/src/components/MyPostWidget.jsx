import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutline,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import UserImage from "./UserImage";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { setPosts } from "../utils/userSlice";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const theme = useSelector((store)=>store?.app?.mode)
  const { _id } = useSelector((store) => store?.user?.user);
  const { token } = useSelector((store) => store?.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const response = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts:posts?.data }));
    setImage(null);
    setPost("");
  };
  return (
    <div className={`px-4 pt-6 pb-3 mb-4 rounded-md ${theme==="dark" ? "bg-[#404040] text-[#ffffff]":"bg-[#ffffff]"}`}>
      <div className="flex justify-between items-center gap-3">
        <UserImage image={picturePath} alt="user" />
        <input
          className={`w-full rounded-full py-4 px-4  outline-[#1e36ad82]  ${theme==="dark"?"bg-[#1d1d1d]":"bg-[#e7e7e7]"}`}
          type="text"
          placeholder="What's on your mind"
          onChange={(e) => {
            setPost(e.target.value);
          }}
          value={post}
        />
      </div>
      {isImage && (
        <div className={`flex mt-4 p-4  rounded-lg border-2`}>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => {
              setImage(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="flex justify-between items-center w-full">
                <div
                  {...getRootProps()}
                  className="w-full border-2 border-blue-500 border-dashed p-2 cursor-pointer"
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image here</p>
                  ) : (
                    <div className="flex justify-between items-center">
                      <p>{image.name}</p>
                      <EditOutlined />{" "}
                    </div>
                  )}
                </div>
                {image && (
                  <div
                    className=""
                    onClick={() => {
                      setImage(null);
                    }}
                  >
                    <DeleteOutline />
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}
      <hr className="my-6" />

      <div className="flex justify-between items-center">
        <div
          className="flex justify-between items-center gap-1"
          onClick={() => {
            setIsImage(!isImage);
          }}
        >
          <ImageOutlined />
          <p className="cursor-pointer">Image</p>
        </div>
        {isNonMobileScreens ? (
          <>
            <div className="flex justify-between items-center gap-1">
              <GifBoxOutlined />
              <p>Clip</p>
            </div>
            <div className="flex justify-between items-center gap-1">
              <AttachFileOutlined />
              <p>Attachment</p>
            </div>
            <div className="flex justify-between items-center gap-1">
              <MicOutlined />
              <p>Audio</p>
            </div>
           
          </>
        ) : (
            <div className="flex justify-between items-center gap-1">
                <MoreHorizOutlined/>
            </div>
        )}
        <button disabled={!post} className={`text-sm font-semibold bg-[#5fa5de] text-white rounded-full px-2 py-1 cursor-pointer`} onClick={handlePost}>POST</button>
      </div>
    </div>
  );
};

export default MyPostWidget;
