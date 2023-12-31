const Post = require("../models/Post.model");
const User = require("../models/User.model");

/****Create a Post ****/
const createPost = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const postobj = { category: "profiles", ...req.body };
    postobj.author = user.id;
    const post = new Post(postobj);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "An error occured while creating a post" });
  }
};

/****Update a Post ****/

const updatePost = async (req, res) => {
  try {
    const payload = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: payload },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the post." });
  }
};

/****  Delete a Post****/

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post." });
  }
};

/****Like a Post****/

const likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    console.log(req.payload._id, postId, req.params);
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $push: { likes: req.payload._id } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json(post);
  } catch (error) {
    console.log("like post error", error);
  }
};

/*** Get Post Likes ***/
const getNumberLikes = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ error: "not found" });
    }
    const likesCount = post.likes.length;
    res.status(200).json({ likesCount });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while fetching the user profile." });
  }
};

/****  Unlike a Post****/

const unlikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $pull: { likes: req.payload._id } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while unliking the post." });
  }
};

/*get all posts*/
const getAllPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);

    // Find posts by authors the user is following
    let postQuery = { author: { $in: currentUser.following } };

    if (currentUser.isAdmin) {
      postQuery = {}; // Empty query to get all posts for admin
    } else {
      postQuery.author.$in.push(currentUser._id); // Include own posts
    }

    const posts = await Post.find(postQuery)
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
        options: {
          sort: { createdAt: "desc" },
        },
      })
      .sort({ createdAt: "desc" });;

    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the posts." });
  }
};

/*get one post*/
const getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId)
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
        options: {
          sort: { createdAt: "desc" }, // Sort comments by createdAt in descending order
        },
      });
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the post." });
  }
};
const getAllPostsSearch = async (category, res) => {
  try {
    const posts = await Post.find({ category })
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
        options: {
          sort: { createdAt: "desc" },
        },
      });

    res.json(posts); // Send the fetched posts as the response
  } catch (error) {
    console.log("Error fetching posts by category", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching posts by category." });
  }
};

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
};
