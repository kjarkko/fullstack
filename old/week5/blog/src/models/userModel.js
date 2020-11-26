const name = 'User'
const schema = {
  username: String,
  passwordHash: String
}
const toJSON = {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
}

model = require('./baseModel')(name, schema, toJSON)

module.exports = model