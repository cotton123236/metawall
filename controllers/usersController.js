const User = require('./../models/usersModel')
const responser = require('../utils/responser')
const status = require('../utils/status')


const { success, error } = responser

// get all
const getAll = async (req, res, next) => {
  try {
    const data = await User.find()
    success(res, data)
  }
  catch(err) {
    error(res, status.error, err)
  }
}

// get by id
const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await User.findById(id)
    .populate({
      path: 'follows'
    })
    .populate({
      path: 'likes'
    })
    // .populate({
    //   path: 'likes.user',
    //   select: 'name image'
    // })
    if (data) success(res, data)
    else error(res, status.errorId)
  }
  catch(err) {
    error(res, status.error, err)
  }
}


module.exports = {
  getAll,
  getById
}