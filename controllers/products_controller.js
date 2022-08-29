const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
router.use(express.json());
router.use(express.urlencoded({ extended:true}));
const seedProduct = require('../models/seed_products');
const Product = require('../models/Product')

router.get('/', (req,res) => {
  const context = Product.find({})
  res.render('index.ejs', {keyboards: context})
})

router.get('/:id', (req,res) => {
    const context = Product.findById(req.params.id)
    res.render('show.ejs', {keyboard: context})
})

module.exports = router;