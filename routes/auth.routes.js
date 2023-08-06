const router = require('express').Router()
const {signUp, login}= require ('../controllers/authenticationController')
const { isAuthenticated } = require('../middlewares/jwt.middleware');

router.get('/', (req, res, next) => {
  res.json('All good in auth')
})

/* POST route to signup */
router.post('/signup', signUp);

/* POST route to login */
router.post('/login', login);

/* GET route to verify the token */
router.get('/verify', isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
})

module.exports = router
