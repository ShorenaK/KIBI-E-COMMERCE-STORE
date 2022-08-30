const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
router.use(express.json());
router.use(express.urlencoded({ extended: true}));
// const seedProduct = require('../models/seed_products');
const Product = require('../models/Product');
const Keycap = require('../models/Keycap');

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
  // keyboardPurchased.keycaps = req.body.keycaps; // this is placeholder for when we add customization options in stretch goals
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

// this will need to be updated to handle both keyboards and keycaps, since they are in separate collections
router.get('/:id', async (req,res) => {
  const keyboardToShow = await Product.findById(req.params.id, (err,result) => {
    if (err) {
      console.log("No keyboard found at this id");
      return null;
    }
    return result;
  });
  const keycapToShow = await Keycap.findById(req.params.id, (err,result) => {
    if (err) {
      console.log("No keycap found at this id");
      return null;
    }
    return result;
  });
  res.render('show.ejs', {keyboard: keyboardToShow, keycap: keycapToShow});
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

module.exports = {router: router, cart: cart};