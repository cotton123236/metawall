const mongoose = require('mongoose')
const { Schema, model } = mongoose


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'field "name" is required.']
  },
  email: {
    type: String,
    required: [true, 'field "email" is required.'],
    unique: true,
    lowercase: true,
    select: false
  },
  photo: String
}, {
  versionKey: false
})

const User = model('User', userSchema)


module.exports = User