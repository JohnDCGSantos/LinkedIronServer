const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

/*****Signup******/

const signUp = async (req, res) => {
  const payload = req.body // { email: 'someEmail', password '1234'}

  const salt = bcrypt.genSaltSync(13)
  const passwordHash = bcrypt.hashSync(payload.password, salt)

  try {
    const newUser = await User.create({
      username: payload.username,
      email: payload.email,
      password: passwordHash,
      image: payload.image,
      bootcamp: payload.bootcamp,
      graduationDate: payload.graduationDate,
    })
    res.status(201).json({ message: 'User created' })
    console.log(
      'Here is your new User------------------>>>>>>',
      newUser,
      '<<<<<<------------------'
    )
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

/******Login******/

const login = async (req, res) => {
  try {
    const payload = req.body // { email: 'someEmail', password '1234'}
    /* Check if the user exists */
    const potentialUser = await User.findOne({ email: payload.email }).select('+password')
    if (potentialUser) {
      /* Check if the password is correct */
      if (bcrypt.compareSync(payload.password, potentialUser.password)) {
        // Create an object that will be set as the token payload
        const payload = potentialUser.toJSON()
        delete payload.password

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '6h',
        })
        // Sending back the token to the front
        res.status(202).json({ token: authToken })
      } else {
        /* Incorrect password */
        res.status(403).json({ errorMessage: 'Password invalid' })
      }
    } else {
      /* No user found */
      res.status(403).json({ errorMessage: 'No user found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occured while logging:', error })
  }
}

/*****Logout******/

const logout = (req, res) => {
  //Logout to be handled on the client side by removing the JWT token.
  res.json({ message: 'Logged out successfully.' })
}

module.exports = {
  signUp,
  login,
}
