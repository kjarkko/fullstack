const mongoose = require('mongoose')

const name = 'Blog'
const schema = {
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}
const toJSON = {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
}

const model = require('./baseModel')(name, schema, toJSON)

module.exports = model