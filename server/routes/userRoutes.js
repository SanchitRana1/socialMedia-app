import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.route("/:id").get(verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); //getting userInfo by id
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

router.route("/:id/friends").get(verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);//getting userInfo by id
    const friends = await  Promise.all(user.friends.map((id) => User.findById(id)));
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(201).json({ success: true, data: formattedFriends });
  } catch (error) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

// UPDATE
router.route("/:id/:friendId").patch(verifyToken, async (req, res) => {
  try {
    const { id,friendId } = req.params;
    const user = await User.findById(id);//getting userInfo by id
    const friend = await User.findById(friendId);//getting user friends Info by id
   //checking if user friendlist contains the friend
    if(user?.friends.includes(friendId)){
      user.friends = user.friends.filter((id)=>id!==friendId);
      friend.friends = friend.friends.filter((fId)=>fId!==id);
    }else{
      user.friends.push(friendId);
      friend.friends.push(id)
    }
    await user.save(); //saving changes made for user
    await friend.save();//saving changes made for user's friend

    const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(201).json({ success: true, data: formattedFriends });
  } catch (error) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

export default router;
