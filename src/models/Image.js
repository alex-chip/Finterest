const { Schema, model } = require('mongoose')
const fecha = new Date()

const imageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  path: { type: String },
  originalname: { type: String },
  mimetype: { type: String },
  size: { type: Number },
  created_at: { type: Date, default: fecha }
})

module.exports = model('Image', imageSchema)
