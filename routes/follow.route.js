const express = require('express');
const router = express.Router();
const {followUser, unfollowUser} = require('../controllers/followController');



router.post('/users/:userId/follow', followUser);

router.delete('/users/:userId/follow', unfollowUser);

module.exports = router;
