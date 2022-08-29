const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended:true}));
const seedProduct = require('../models/seed_products');
const Product = require('../models/Product')


// testing








module.exports = router;