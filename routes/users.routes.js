const router = require('express').Router()
const User = require('../models/User.model')

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const userProfile = await User.findById(req.params.userId)
    if (!userProfile) {
      return res.status(404).json({ errorMessage: 'User profile not found' })
    }
    res.status(200).json(userProfile)
    console.log(userProfile)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.put('/:userId', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    })

    res.json(updatedUser)
    console.log(updateUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.delete('/:userId', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId)

    res.status(202).json({ message: 'User successfully deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router
