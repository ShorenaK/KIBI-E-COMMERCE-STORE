const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    cartAllproducts: Array,
 }, {timestamps: true})
 

const cartSchema1 = mongoose.model('Cart', cartSchema)

module.exports = cartSchema1
