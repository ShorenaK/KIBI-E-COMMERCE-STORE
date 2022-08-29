const mongoose = require('mongoose')

const keycapSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    price: {type: Number, min: 0}, 
    image: {type: String, required: true},
    description: {type: String, required:true}
}, {timestamps: true})


const Keycap = mongoose.model('Keycap', keycapSchema)

module.exports = Keycap