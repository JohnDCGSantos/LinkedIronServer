const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.json('LinkedIron')
})
const usersRoutes = require('./users.routes')
router.use('/users', usersRoutes)

module.exports = router
