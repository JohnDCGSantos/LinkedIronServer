const Post = require('../models/Post.model')
const User = require('../models/User.model')

/****Create a Post ****/
const createPost = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    const postobj = { category: 'profiles', ...req.body }
    postobj.author = user.id
    const post = new Post(postobj)
    await post.save()
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ error: 'An error occured while creating a post' })
  }
}
/*get all posts*/

const getAllPosts = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }
    const postobj = { category: 'profiles', ...req.body }
    postobj.author = user.id
    const posts = await Post.find(postobj).populate('user', 'username')
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the posts.' })
  }
}

/****Update a Post ****/

const updatePost = async (req, res) => {
  try {
    const { content } = req.body
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: { content } },
      { new: true }
    )
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the post.' })
  }
}

/****  Delete a Post****/

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId)
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' })
    }
    res.json({ message: 'Post deleted successfully.' })
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the post.' })
  }
}

/****Like a Post****/

const likePost = async (req, res) => {
  try {
    const { userId } = req.body
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $addToSet: { likes: userId } },
      { new: true }
    )
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while liking the post.' })
  }
}

/****  Unlike a Post****/

const unlikePost = async (req, res) => {
  try {
    const { userId } = req.body
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $pull: { likes: userId } },
      { new: true }
    )
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while unliking the post.' })
  }
}

module.exports = { createPost, updatePost, deletePost, likePost, unlikePost, getAllPosts }
