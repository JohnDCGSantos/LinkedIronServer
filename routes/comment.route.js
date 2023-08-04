const express = require('express');
const router = express.Router();
const { createComment, updateComment, deleteComment } = require('../controllers/commentController');



router.post('/posts/:postId/comments', createComment);


router.put('/comments/:commentId', updateComment);

router.delete('/comments/:commentId', deleteComment);

module.exports = router;
