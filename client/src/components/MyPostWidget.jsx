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
import { POSTS_API } from "../utils/constants";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const theme = useSelector((store) => store?.app?.mode);
  const { _id } = useSelector((store) => store?.user?.user);
  const { token } = useSelector((store) => store?.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Function to convert image file to base64 string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePost = async () => {
    let pictureBase64 = null;
    if (image) {
      pictureBase64 = await convertToBase64(image);
    }
    let postData = {
      userId: _id,
      description: post,
      pictureBase64,
      picturePath: image ? image.name : null,
    };
    const response = await fetch(`${POSTS_API}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const posts = await response.json();
    dispatch(setPosts({ posts: posts?.data }));
    setImage(null);
    setPost("");
  };

  // const handlePost = async () => {
  //   const formData = new FormData();
  //   formData.append("userId", _id);
  //   formData.append("description", post);
  //   if (image) {
  //     formData.append("picture", image);
  //     formData.append("picturePath", image.name);
  //     // formData.append("photo", `data:image/jpeg;base64,${image.name}`);
  //   }
  //   const response = await fetch(`${POSTS_API}`, {
  //     method: "POST",
  //     headers: { Authorization: `Bearer ${token}` },
  //     body: formData,
  //   });
  //   const posts = await response.json();
  //   dispatch(setPosts({ posts:posts?.data }));
  //   setImage(null);
  //   setPost("");
  // };
  return (
    <div
      className={`px-4 pt-6 pb-3 mb-4 rounded-md ${
        theme === "dark" ? "bg-[#404040] text-[#ffffff]" : "bg-[#ffffff]"
      }`}
    >
      <div className="flex justify-between items-center gap-2">
        {/* <div className="basis-[16%]"> */}
        <UserImage image={picturePath} alt="user" />
        {/* </div> */}
        <input
          className={`w-full rounded-full py-3 px-4 outline-[#1e36ad82]  ${
            theme === "dark" ? "bg-[#1d1d1d]" : "bg-[#e7e7e7]"
          }`}
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
            <MoreHorizOutlined />
          </div>
        )}
        <button
          disabled={!post}
          className={`text-sm font-semibold bg-[#5fa5de] text-white rounded-full px-2 py-1 cursor-pointer`}
          onClick={handlePost}
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default MyPostWidget;
