const config = require('./config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })

const blogRouter = require('./controllers/blogController')
const userRouter = require('./controllers/userController')
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

module.exports = app