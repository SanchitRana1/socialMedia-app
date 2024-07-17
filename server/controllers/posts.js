import express from "express"
import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";

export const createPost = async(req,res)=>{
    try {
        const {userId,description,picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = await Post.create({
            userId,
            firstName:user.firstName,
            lastname:user.lastname,
            location:user.location,
            description,
            userPicturePath:user.userPicturePath,
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
