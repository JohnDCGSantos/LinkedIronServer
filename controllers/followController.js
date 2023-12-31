const User = require('../models/User.model')

/****Follow User ****/
const followUser = async (req, res) => {
  try {
    const { userId, followUserId } = req.body
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }
    const followUser = await User.findById(followUserId)
    if (!followUser) {
      return res.status(404).json({ error: 'User to follow not found.' })
    }
    user.following.push(followUserId)
    followUser.followers.push(userId)
    await user.save()
    await followUser.save()
    res.json({ message: 'User followed successfully.' })
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while following the user.' })
  }
}

const getFollowingUsers = async (req, res) => {
  try {
    const { userId } = req
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    const followingUserIds = user.following
    const followingUsers = await User.find({ _id: { $in: followingUserIds } })

    res.json(followingUsers)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching following users.' })
  }
}
const getFollowerUsers = async (req, res) => {
  try {
    const { userId } = req
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    const followersUserIds = user.followers
    const followerUsers = await User.find({ _id: { $in: followersUserIds } })

    res.json(followerUsers)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching following users.' })
  }
}

/**** Unfollow a User****/
const unfollowUser = async (req, res) => {
  try {
    const { userId, unfollowUserId } = req.body
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }
    const unfollowUser = await User.findById(unfollowUserId)
    if (!unfollowUser) {
      return res.status(404).json({ error: 'User to unfollow not found.' })
    }
    user.following = user.following.filter(
      followedUser => followedUser.toString() !== unfollowUserId.toString()
    )
    unfollowUser.followers = unfollowUser.followers.filter(
      follower => follower.toString() !== userId.toString()
    )
    await user.save()
    await unfollowUser.save()
    res.json({ message: 'User unfollowed successfully.' })
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while unfollowing the user.' })
  }
}

module.exports = {
  followUser,
  unfollowUser,
  getFollowingUsers,
  getFollowerUsers,
}
