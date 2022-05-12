const express = require('express')
const errors = require('./../utils/errors')
const postsController = require('./../controllers/postsController')


const { captureError } = errors
const router = express.Router()

// get all
router.get('/', captureError(postsController.getAll))
// // get by id
router.get('/:id', captureError(postsController.getById))
// post one or many
router.post('/', captureError(postsController.postOneOrMany))
// delete all
router.delete('/', captureError(postsController.deleteAll))
// delete by id
router.delete('/:id', captureError(postsController.deleteById))
// patch by id
router.patch('/:id', captureError(postsController.patchById))



module.exports = router