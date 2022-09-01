const mongoose = require('mongoose')

const switchSchema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, min: 0},
  image: {type: String, required: true},
  description: {type: String, required: true}
}, {timestamps: true})

const Switch = mongoose.model('Switch', switchSchema)
module.exports = Switch