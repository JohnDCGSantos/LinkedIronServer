const express = require("express");
const router = express.Router();
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} = require("../controllers/postController");
router.post("/posts", createPost);

router.put("/posts/:postId", updatePost);

router.delete("/posts/:postId", deletePost);

router.post("/posts/:postId/like", likePost);

router.delete("/posts/:postId/like", unlikePost);

module.exports = router;