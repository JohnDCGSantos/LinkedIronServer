const User = require('../models/User.model')

/**** Fetch all Users ****/
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'An error occured while fetching the user profile.' })
  }
}

/**** Fetch User Profile ****/
const getUserProfile = async (req, res) => {
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
}

/****Update User Data ****/

const updateUserData = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,  
      req.body, 
      { new: true } 
    );

    if (updatedUser){
      res.json(updatedUser);
      console.log(updatedUser);
    }
    else{
      res.status(500).error("Failed to update user")
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/****Delete User Data ****/

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId)

    res.status(202).json({ message: 'User successfully deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports = {
  getUsers,
  getUserProfile,
  updateUserData,
  deleteUser,
}
