const router = require('express').Router()
const usersRoutes= require('../routes/users.routes')

router.get('/', (req, res, next) => {
  res.json('LinkedIron')
})

router.use('/users', usersRoutes)

module.exports = router
