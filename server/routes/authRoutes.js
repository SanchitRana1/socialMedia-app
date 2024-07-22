import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//LOGIN
router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    const hashPassword = user?.password;
    if (user) {
      bcrypt.compare(password, hashPassword, (err, result) => {
        if (err) {
          res.status(400).json("Error comparing passwords");
        }
        if (result) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
          // Passwords match, authentication successful
          res.status(201).json({
            success: true,
            data: {user,token}
          });
        } else {
          // Passwords don't match, authentication failed
          res.status(400).json({
            success: false,
            result: "Invalid credentials.",
          });
        }
      });
    }else {
        res.status(400).json({ result: "User does not exists !", success: false });
      }
  } catch (error) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

export default router;
