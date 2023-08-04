const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

/****Create a Comment****/
const createComment = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    const comment = new Comment({ user: userId, post: postId, content });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the comment." });
  }
};

/****Update a Comment****/
const updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { $set: { content } },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }
    res.json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the comment." });
  }
};

/**** Delete a Comment****/
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }
    res.json({ message: "Comment deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the comment." });
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
