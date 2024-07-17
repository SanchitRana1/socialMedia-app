import bcrypt from "bcrypt";
import User from "../models/UserModel.js";

// REGISTER
export const register = async(req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    if (newUser) {
      res.status(201).json({ success: true, data: newUser });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error?.message });
  }
};