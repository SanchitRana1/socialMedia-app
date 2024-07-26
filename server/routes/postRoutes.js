import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Post from "../models/PostModel.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/UserModel.js";

import dotenv from "dotenv"
dotenv.config(); // access .env file

// Uploading images to cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const router = express.Router();


router.route("/").post(verifyToken, async (req, res) => {
  try {
    const {userId,description,picturePath,pictureBase64} = req.body;

    const photoURL = pictureBase64 ? await cloudinary.uploader.upload(pictureBase64):"img"
    console.log(`${photoURL.url}`)
    const user = await User.findById(userId);
    const newPost = await Post.create({
        userId,
        firstName:user.firstName,
        lastName:user.lastName,
        location:user.location,
        description,
        userPicturePath:user.picturePath,
        picturePath:photoURL?.url,
        likes:{},
        comments:[]
    })
    const allPosts = await Post.find();
    if (newPost) {
        res.status(201).json({ success: true, data: allPosts });
      }
} catch (error) {
    res.status(409).json({ success: false, error: error?.message });
}
})

// ------------------- READ -------------------
/*Getting user Feed*/
router.route("/").get(verifyToken, async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json({
      success: true,
      data: allPosts,
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error?.message });
  }
});

/*Getting user Posts*/
router.route("/:userId").get(verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ userId });
    res.status(200).json({
      success: true,
      data: userPosts,
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error?.message });
  }
});

router.route("/:id/like").patch(verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error?.message });
  }
});

export default router;
