const mongoose = require('mongoose')

const prodcutSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    price: {type: Number, min: 0}, 
    image: {type: String, required: true},
    description: {type: String, required:true}
}, {timestamps: true})


const Product = mongoose.model('Product', prodcutSchema)
module.exports = Product