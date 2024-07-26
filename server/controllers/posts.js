import express from "express"
import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";

import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv"
dotenv.config(); // access .env file

// Uploading images to cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

// export const createPost = async(req,res)=>{
//     try {
//         const {userId,description,picturePath} = req.body;
//         const photoURL = await cloudinary.uploader.upload(photo);
//         const user = await User.findById(userId);
//         const newPost = await Post.create({
//             userId,
//             firstName:user.firstName,
//             lastName:user.lastName,
//             location:user.location,
//             description,
//             userPicturePath:user.picturePath,
//             picturePath,
//             likes:{},
//             comments:[]
//         })
//         const allPosts = await Post.find();
//         if (newPost) {
//             res.status(201).json({ success: true, data: allPosts });
//           }
//     } catch (error) {
//         res.status(409).json({ success: false, error: error?.message });
//     }
// }

export const createPost = async(req,res)=>{
    console.log(await req.body)
    try {
        const {userId,description,picturePath,pictureBase64} = req.body;
        const photoURL = await cloudinary.uploader.upload(pictureBase64);
        console.log(`PHOTO: ${photoURL}`)
        const user = await User.findById(userId);
        const newPost = await Post.create({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:photoURL?.url,
            picturePath,
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
}
