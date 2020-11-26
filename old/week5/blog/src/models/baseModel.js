const mongoose = require('mongoose')

module.exports = (name, fields, toJSON) => {
  const schema = mongoose.Schema(fields)
  let schemaName = name
  if(process.env.NODE_ENV === 'test')
    schemaName += 'Test'
  schema.set('toJSON', toJSON)
  return mongoose.model(schemaName, schema)
}