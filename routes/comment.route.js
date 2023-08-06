const express = require('express');
const router = express.Router();
const { createComment, updateComment, deleteComment } = require('../controllers/commentController');
const { isAuthenticated, extractUserId } = require('../middlewares/jwt.middleware')

router.use(isAuthenticated);
router.use(extractUserId);

router.post('/posts/:postId/comments', createComment);

router.put('/comments/:commentId', updateComment);

router.delete('/comments/:commentId', deleteComment);

module.exports = router;
