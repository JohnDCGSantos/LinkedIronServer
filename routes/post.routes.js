const express = require('express')
const { isAuthenticated, extractUserId } = require('../middlewares/jwt.middleware')

const router = express.Router()
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  getAllPosts,
  getPostById,
} = require('../controllers/postController')

router.use(isAuthenticated);
router.use(extractUserId);

router.post('/', createPost)

router.get('/:postId', getPostById)

router.get('/', getAllPosts)

router.put('/:postId', updatePost)

router.delete('/:postId', deletePost)

router.post('/:postId/like', likePost)

router.delete('/:postId/like', unlikePost)

module.exports = router
