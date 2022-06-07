const express = require('express')
const errors = require('./../utils/errors')
const auth = require('./../middlewares/auth')
const usersController = require('./../controllers/usersController')

const { captureError } = errors
const router = express.Router()

/* GET users listing. */
router.get('/', captureError(usersController.getAll))
router.get('/:id', captureError(usersController.getById))
router.post('/sign_up', captureError(usersController.signUp))
router.post('/sign_in', captureError(usersController.signIn))
router.patch('/password', auth, captureError(usersController.updatePassword))

module.exports = router
