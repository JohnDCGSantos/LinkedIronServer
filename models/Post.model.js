const { Schema, model } = require('mongoose')

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
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
