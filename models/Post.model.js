const { Schema, model } = require('mongoose')

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,

    },
    category: {
      type: String,
      enum: ['careers', 'events', 'profiles', 'other'], // Corrected the enum property
      default: 'profiles',
    },
  },
  {
    timestamps: true,
  }
)

const Post = model('Post', postSchema)

module.exports = Post
