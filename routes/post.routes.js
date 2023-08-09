const express = require('express')
const router = express.Router()
const { isAuthenticated, extractUserId } = require('../middlewares/jwt.middleware')
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  getAllPosts,
  getPostById,
  getAllPostsSearch,
} = require('../controllers/postController')
const { createComment, updateComment, deleteComment } = require('../controllers/commentController')

router.use(isAuthenticated)
router.use(extractUserId)

router.get('/', getAllPosts)
router.get('/:postId', getPostById)
router.post('/', createPost)
router.put('/:postId', updatePost)
router.delete('/:postId', deletePost)

router.post('/:postId/like', likePost)
router.delete('/:postId/like', unlikePost)

router.post('/:postId/comment', createComment)
router.put('/:postId/comment/:commentId', updateComment)
router.delete('/:postId/comment/:commentId', deleteComment)
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category
    await getAllPostsSearch(category, res)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching posts by category.' })
  }
})
module.exports = router
