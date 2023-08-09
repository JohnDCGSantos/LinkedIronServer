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

/****Update a Post ****/

const updatePost = async (req, res) => {
  try {
    const payload = req.body
    const post = await Post.findByIdAndUpdate(req.params.postId, { $set: payload }, { new: true })
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
    const { postId } = req.params;
    const userId = req.payload._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: 'Post already liked by the user.' });
    }

    post.likes.push(userId);
    await post.save();

    const likesCount = post.likes.length;
    res.json({ likesCount });
  } catch (error) {
    console.log('Like post error:', error);
    res.status(500).json({ error: 'An error occurred while liking the post.' });
  }
};


/*** Get Post Likes ***/
const getNumberLikes = async (req, res) => {
  try {
    const postId = req.params.postId
    const post = await Post.findById(postId)
    if (!post) {
      res.status(404).json({ error: 'not found' })
    }
    const likesCount = post.likes.length
    res.status(200).json({ likesCount })
  } catch (error) {
    res.status(500).json({ error: 'An error occured while fetching the user profile.' })
  }
}

/****  Unlike a Post****/

const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.payload._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({ error: 'Post is not liked by the user.' });
    }

    post.likes.pull(userId);
    await post.save();

    const likesCount = post.likes.length;
    res.json({ likesCount });
  } catch (error) {
    console.log('Unlike post error:', error);
    res.status(500).json({ error: 'An error occurred while unliking the post.' });
  }
};


/*get all posts*/
const getAllPosts = async (req, res) => {
  console.log(req.payload)
  try {
    const currentUser = await User.findById(req.payload._id)

    // Find posts by authors the user is following
    const followingPosts = await Post.find({ author: { $in: currentUser.following } })
      .populate('author')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
        },
        options: {
          sort: { createdAt: 'desc' },
        },
      })
    const ownPosts = await Post.find({ author: currentUser._id })
      .populate('author')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
        },
        options: {
          sort: { createdAt: 'desc' },
        },
      })
    const allPosts = [...followingPosts, ...ownPosts]

    res.json(allPosts)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the posts.' })
  }
}

/*get one post*/

const getPostById = async (req, res) => {
  try {
    const postId = req.params.postId
    const post = await Post.findById(postId)
      .populate('author')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
        },
        options: {
          sort: { createdAt: 'desc' }, // Sort comments by createdAt in descending order
        },
      })
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the post.' })
  }
}
const getAllPostsSearch = async (category, res) => {
  try {
    const posts = await Post.find({ category })
      .populate('author')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
        },
        options: {
          sort: { createdAt: 'desc' },
        },
      })

    res.json(posts) // Send the fetched posts as the response
  } catch (error) {
    console.log('Error fetching posts by category', error)
    res.status(500).json({ error: 'An error occurred while fetching posts by category.' })
  }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getNumberLikes,
  unlikePost,
  getAllPosts,
  getPostById,
  getAllPostsSearch,
}
