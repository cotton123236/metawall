const validator = require('validator')
const User = require('./../models/usersModel')
const responser = require('../utils/responser')
const status = require('../utils/status')
const errors = require('../utils/errors')
const {
  bcryptPassword,
  comparePassword,
  createJWT
} = require('./../utils/utils')


const { success } = responser
const { createError } = errors

// get all
const getAll = async (req, res, next) => {
  const data = await User.find()
  success(res, data)
}

// get by id
const getById = async (req, res, next) => {
  const { id } = req.params
  const data = await User.findById(id)
  .populate({
    path: 'follows'
  })
  .populate({
    path: 'likes'
  })
  if (data) success(res, data)
  else return next(createError(status.errorId))
}

// 註冊
const signUp = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  // 驗證
  if (!name || !email || !password || !confirmPassword) {
    return next(createError(status.errorField))
  }
  if(password !== confirmPassword){
    return next(createError({
      code: 400,
      message: 'Field "password" & "confirmPassword" is different.'
    }))
  }
  if (!validator.isLength(name, { min: 2 })) {
    return next(createError({
      code: 400,
      message: 'Field "name" needs at least 2 characters.'
    }))
  }
  if (!validator.isEmail(email)) {
    return next(createError({
      code: 400,
      message: 'Field "email" format error.'
    }))
  }
  if (!validator.isLength(password, { min: 8 })) {
    return next(createError({
      code: 400,
      message: 'Field "password" needs at least 8 characters.'
    }))
  }
  const isEmailExist = await User.findOne({ email })
  if (isEmailExist) {
    return next(createError({
      code: 400,
      message: 'Email has been registered.'
    }))
  }
  // 密碼加密
  const hash = await bcryptPassword(password)
  const user = await User.create({ name, email, password: hash })

  res.status(201).send({
    status: 'success',
    token: createJWT(user._id)
  })
}

// 登入
const signIn = async (req, res, next) => {
  const { email, password } = req.body
  // 基本驗證
  if (!email || !password) {
    return next(createError(status.errorField))
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return next(createError({
      code: 400,
      message: 'Please sign up first.'
    }))
  }
  console.log(password, user.password)
  // 比對密碼
  const isPasswordCorrect = await comparePassword(password, user.password)
  if (!isPasswordCorrect) {
    return next(createError({
      code: 400,
      message: 'Field "email" or "password" is wrong.'
    }))
  }

  res.status(201).send({
    status: 'success',
    token: createJWT(user._id)
  })
}

// 更新密碼
const updatePassword = async (req, res, next) => {
  const { user } = req
  const { password, confirmPassword } = req.body
  // 基本驗證
  if (!password || !confirmPassword) {
    return next(createError(status.errorField))
  }
  if(password !== confirmPassword){
    return next(createError({
      code: 400,
      message: 'Field "password" & "confirmPassword" is different.'
    }))
  }
  if (!validator.isLength(password, { min: 8 })) {
    return next(createError({
      code: 400,
      message: 'Field "password" needs at least 8 characters.'
    }))
  }
  // 若與舊密碼一樣
  const isPasswordTheSame = await comparePassword(password, user.password)
  if (isPasswordTheSame) {
    return next(createError({
      code: 400,
      message: 'Please enter new password.'
    }))
  }
  // 加密新密碼
  const hash = await bcryptPassword(password)
  await User.updateOne({ _id: user._id }, { password: hash })

  res.status(201).send({
    status: 'success',
    message: 'Update password success.'
  })
}


module.exports = {
  getAll,
  getById,
  signUp,
  signIn,
  updatePassword
}