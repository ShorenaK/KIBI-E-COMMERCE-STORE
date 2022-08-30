const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
router.use(express.json());
router.use(express.urlencoded({ extended: true}));
const seedProduct = require('../models/seed_products');
const Product = require('../models/Product');
const Keycap = require('../models/Keycap');

// run this once to set up database
async function addProducts(products) {
  await Product.insertMany(seedProduct)
  console.log("Products added")
};
addProducts();

// adding test cart for now. We should eventually replace this with a database model
let cart = [];

router.get('/', async (req,res) => {
  const context = await Product.find({});
  res.render('index.ejs', {keyboards: context});
});

router.get('/keyboards', async (req,res) => {
    const context = await Product.find({});
    res.render('keyboards.ejs', {keyboards: context});
});

router.get('/keyboards/:id', async (req,res) => {
  const context = await Product.findById(req.params.id);
  res.render('show.ejs', {keyboard: context});
});

router.post('/keyboards/:id', async (req,res) => {
  const keyboardPurchased = await Product.findById(req.params.id);
  keyboardPurchased.keycaps = req.body.keycaps;
  cart.push(keyboardPurchased);
  res.render('cart.ejs', {cart: cart}); // cart is an array of objects, which can either be keyboards or keycaps
});

router.get('/keycaps', async (req,res) => {
  const context = await Keycap.find({});
  res.render('keycaps.ejs', {keycaps: context})
});

router.get('/keycaps/:id', async (req,res) => {
  const context = await Keycap.findById(req.params.id);
  res.render('show.ejs', {keycap: context});
});

router.post('/keycaps/:id', async (req,res) => {
  const keycapsPurchased = await Keycap.findById(req.params.id);
  cart.push(keycapsPurchased);
  res.render('cart.ejs', {cart: cart}); // cart is an array of objects, each of which can either be keyboards or keycaps
});

router.get('/:id', async (req,res) => {
  const context = await Product.findById(req.params.id);
  res.render('show.ejs', {keyboard: context});
});

router.post('/new', async (req,res) => {
  const newProduct = req.body;
  await Product.create({
    name: newProduct.name,
    price: newProduct.price,
    image: newProduct.image,
    description: newProduct.description,
  });
  res.redirect('/');
});

module.exports = router;