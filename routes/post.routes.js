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
} = require('../controllers/postController')

router.use(isAuthenticated);
router.use(extractUserId);

router.post('/posts', createPost)

router.get('/posts', getAllPosts)

router.put('/posts/:postId', updatePost)

router.delete('/posts/:postId', deletePost)

router.post('/posts/:postId/like', likePost)

router.delete('/posts/:postId/like', unlikePost)

module.exports = router
