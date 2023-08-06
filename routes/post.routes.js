const express = require('express')
const router = express.Router()
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  getAllPosts,
} = require('../controllers/postController')
router.post('/posts', createPost)

router.get('/posts', getAllPosts)

router.get('/posts/:postId')

router.put('/posts/:postId', updatePost)

router.delete('/posts/:postId', deletePost)

router.post('/posts/:postId/like', likePost)

router.delete('/posts/:postId/like', unlikePost)

module.exports = router
