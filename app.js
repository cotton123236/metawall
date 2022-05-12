const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const connector = require('./connections/connector')
const responser = require('./utils/responser')
const errors = require('./utils/errors')
const status = require('./utils/status')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')


// connect to database
connector('hotel')

// express
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

// routes
app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)
app.use((req, res, next) => next(errors.createError(status.notFound)))

// error handle
app.use((err, req, res, next) => {
  const { devError, prodError } = responser
  err.code = err.code || 500
  // dev
  if (process.env.NODE_ENV === 'dev') {
    return devError(res, err)
  }
  // production
  if (err.name === 'ValidationError') {
    err.message
    err.operational = true
    return prodError(res, err)
  }
  prodError(res, err)
})

module.exports = app
