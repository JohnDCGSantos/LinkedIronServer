const router = require('express').Router()
const User = require('../models/User.model')
const { isAuthenticated, extractUserId } = require('../middlewares/jwt.middleware')

const {
  getUsers,
  getUserProfile,
  updateUserData,
  deleteUser,
} = require('../controllers/userController')

router.use(isAuthenticated);
router.use(extractUserId);

router.get('/', getUsers)

router.put('/:userId', updateUserData)

router.delete('/:userId', deleteUser)

module.exports = router
