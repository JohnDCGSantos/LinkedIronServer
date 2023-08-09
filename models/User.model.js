const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false, // Exclude password field by default
    },
    image: {
      type: String,
    },
    bootcamp: {
      type: String,
      required: true,
    },
    graduationDate: {
      type: Date,
      required: true,
    },
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const User = model('User', userSchema)

module.exports = User
