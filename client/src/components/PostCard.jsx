import React, { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteRounded,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  FavoriteBorderRounded,
  ShareOutlined,
} from "@mui/icons-material";
import Friend from "./Friend";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPost } from "../utils/userSlice";

const PostCard = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const [isComment, setIsComment] = useState(false);
  const { token } = useSelector((store) => store?.user);
  const theme = useSelector((store)=>store?.app?.mode)
  const loggedInUserId = useSelector((store) => store?.user?.user?._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost?.data }));
  };

  return (
    <div className={`px-6 py-4 mb-3 rounded-md ${theme==="dark" ? "bg-[#404040] text-[#ffffff]":"bg-[#ffffff]"}`}>
      <Friend
        firendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p className="p-4">{description}</p>
      {picturePath && (
        <img
          className="w-[100%] h-auto rounded-xl"
          alt="postImg"
          src={`http://localhost:5000/assets/${picturePath}`}
        />
      )}

      <div className="flex justify-between items-center my-2">
        <div className="flex justify-between items-center gap-4">
          <div className="flex justify-between items-center gap-1">
            <button onClick={patchLike}>
                {isLiked ? 
                <FavoriteOutlined className={`text-blue-500`}/>:
                <FavoriteBorderOutlined />
  }
            </button>
            <p>{likeCount}</p>
          </div>

          <div className="flex justify-between items-center gap-1">
            <button onClick={()=>{setIsComment(!isComment)}}>
               <ChatBubbleOutlineOutlined className={`${(isComment && comments.length>0) &&"text-blue-500" }`}/>
            </button>
            <p>{comments.length}</p>
          </div>
        </div>
        <button>
            <ShareOutlined/>
        </button>
      </div>
      {(isComment && comments.length>0) && (
        <div className="mt-2">
            {comments.map((comment,i)=>(
                <div key={`${name}-${i}`} className="">
                    <hr />
                    <p className="py-2 ps-4">{comment}</p>
                </div>
            ))}
            <hr />
        </div>
        )}
    </div>
  );
};

export default PostCard;
