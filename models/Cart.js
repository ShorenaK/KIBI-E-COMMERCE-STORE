const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    cartAllproducts: Array,
 }, {timestamps: true})
 

const cartSchemaModel = mongoose.model('Cart', cartSchema)

module.exports = cartSchemaModel
