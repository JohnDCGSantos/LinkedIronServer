const router = require('express').Router()
const User = require('../models/User.model')
const {getUsers, getUserProfile, updateUserData, deleteUser}= require('../controllers/userController')


//TODO: ADD MIDDLEWARES
router.get('/', getUsers);

router.get('/:userId', getUserProfile);

router.put('/:userId',  updateUserData); 
 
router.delete('/:userId', deleteUser);


module.exports = router
