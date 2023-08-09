const express = require('express')
const router = express.Router()
const { isAuthenticated, extractUserId } = require('../middlewares/jwt.middleware')
const {
  createPost,
  updatePost,
  deletePost,
  getNumberLikes,
  likePost,
  unlikePost,
  getAllPosts,
  getPostById,
} = require('../controllers/postController')
const { createComment, updateComment, deleteComment } = require('../controllers/commentController');

router.use(isAuthenticated);
router.use(extractUserId);

router.get('/', getAllPosts)
router.get('/:postId', getPostById)
router.post('/', createPost)
router.put('/:postId', updatePost)
router.delete('/:postId', deletePost)

router.get('/:postId/like', getNumberLikes)
router.post('/:postId/like', likePost)
router.delete('/:postId/like', unlikePost)

router.post('/:postId/comment', createComment);
router.put('/:postId/comment/:commentId', updateComment);
router.delete('/:postId/comment/:commentId', deleteComment);

module.exports = router
