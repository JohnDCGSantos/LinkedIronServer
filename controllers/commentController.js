const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

/****Create a Comment****/
const createComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.userId;
    const { content } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    const comment = new Comment({ author: userId, post: postId, content });
    await comment.save();

    post.comments.push(comment._id);
    await post.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate("author")
      .exec();

    res.status(201).json(populatedComment);
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
