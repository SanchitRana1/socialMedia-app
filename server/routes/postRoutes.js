import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Post from "../models/PostModel.js";

const router = express.Router();

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
router.route("/:userId/posts").get(verifyToken, async (req, res) => {
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

router.route("/:id/like").get(verifyToken, async (req, res) => {
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

    const updatedPost = await post.findByIdAndUpdate(
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
