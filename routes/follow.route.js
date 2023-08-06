const express = require('express');
const router = express.Router();
const {followUser, unfollowUser} = require('../controllers/followController');
const { isAuthenticated, extractUserId } = require('../middlewares/jwt.middleware')

router.use(isAuthenticated);
router.use(extractUserId);

router.post('/users/:userId/follow', followUser);

router.delete('/users/:userId/follow', unfollowUser);

module.exports = router;
