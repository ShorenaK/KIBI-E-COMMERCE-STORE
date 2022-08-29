const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
router.use(express.json());
router.use(express.urlencoded({ extended:true}));
const seedProduct = require('../models/seed_products');
const Product = require('../models/Product')

router.get('/', async (req,res) => {
  const context = await Product.find({})
  res.render('index.ejs', {keyboards: context})
})

router.get('/:id', async (req,res) => {
    const context = await Product.findById(req.params.id)
    res.render('show.ejs', {keyboard: context})
})

module.exports = router;