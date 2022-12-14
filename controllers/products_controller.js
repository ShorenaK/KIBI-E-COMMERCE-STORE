const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const url = require('url');
router.use(express.json());
router.use(express.urlencoded({ extended: true}));
const Product = require('../models/Product');
const Keycap = require('../models/Keycap');
const Switch = require('../models/Switch');

// STRETCH: replace this with a database model and make it session-specific (one per site visitor instead of shared)
let cart = [];

router.get('/', async (req,res) => {
  const keyboards = await Product.find({});
  const keycaps = await Keycap.find({});
  const switches = await Switch.find({});
  res.render('index.ejs', {keyboards: keyboards, keycaps: keycaps, switches: switches});
});

router.get('/keyboards', async (req,res) => {
  const context = await Product.find({});
  res.render('keyboards.ejs', {keyboards: context});
});

// assumes edit page will have an update button using PUT through method override
router.put('/keyboards/:id/edit', async (req,res) => {
  await Product.updateOne({_id: req.params.id},{
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price
  });
  res.redirect(url.format({
    pathname:"/products/edit",
    query: {
      type: 'keyboard',
      id: req.params.id,
    }
  }));
});

// assumes edit page will have a delete button using DELETE through method override
router.delete('/keyboards/:id/edit', async (req,res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products/edit');
});

router.get('/keyboards/:id', async (req,res) => {
  const context = await Product.findById(req.params.id);
  res.render('show.ejs', {keyboard: context, keycap: undefined, keyswitch: undefined});
});

router.post('/keyboards/:id', async (req,res) => {
  const keyboardPurchased = await Product.findById(req.params.id);
  // STRETCH: keyboardPurchased.keycaps = req.body.keycaps; // this is placeholder for when we add customization options in stretch goals
  cart.push(keyboardPurchased);
  res.render('cart.ejs', {cart: cart}); // cart is an array of objects, which can either be keyboards or keycaps
});

router.get('/switches', async (req,res) => {
  const context = await Switch.find({});
  res.render('switches.ejs', {switches: context});
});

// assumes edit page will have an update button using PUT through method override
router.put('/switches/:id/edit', async (req,res) => {
  await Switch.updateOne({_id: req.params.id},{
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price
  });
  res.redirect(url.format({
    pathname:"/products/edit",
    query: {
      type: 'keyswitch',
      id: req.params.id,
    }
  }));
});

// assumes edit page will have a delete button using DELETE through method override
router.delete('/switches/:id/edit', async (req,res) => {
  await Switch.findByIdAndDelete(req.params.id);
  res.redirect('/products/edit');
});

router.get('/switches/:id', async (req,res) => {
  const context = await Switch.findById(req.params.id);
  res.render('show.ejs', {keyboard: undefined, keycap: undefined, keyswitch: context});
});

router.post('/switches/:id', async (req,res) => {
  const switchPurchased = await Switch.findById(req.params.id);
  // STRETCH: keyboardPurchased.keycaps = req.body.keycaps; // this is placeholder for when we add customization options in stretch goals
  cart.push(switchPurchased);
  res.render('cart.ejs', {cart: cart}); // cart is an array of objects, which can either be keyboards or keycaps
});

router.get('/keycaps', async (req,res) => {
  const context = await Keycap.find({});
  res.render('keycaps.ejs', {keycaps: context})
});

// assumes edit page will have an update button using PUT through method override
router.put('/keycaps/:id/edit', async (req,res) => {
  await Keycap.updateOne({_id: req.params.id},{
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price
  });
  res.redirect(url.format({
    pathname:"/products/edit",
    query: {
      type: 'keycap',
      id: req.params.id,
    }
  }));
});

// assumes edit page will have a delete button using DELETE through method override
router.delete('/keycaps/:id/edit', async (req,res) => {
  await Keycap.findByIdAndDelete(req.params.id);
  res.redirect('/products/edit');
});

router.get('/keycaps/:id', async (req,res) => {
  const context = await Keycap.findById(req.params.id);
  res.render('show.ejs', {keycap: context, keyboard: undefined, keyswitch: undefined});
});

router.post('/keycaps/:id', async (req,res) => {
  const keycapsPurchased = await Keycap.findById(req.params.id);
  cart.push(keycapsPurchased);
  res.render('cart.ejs', {cart: cart}); // cart is an array of objects, each of which can either be keyboards or keycaps
});

router.get('/new', (req,res) => {
  res.render('new.ejs');
});
          
// assumes form will include a way to select type: keyboard or keycap
router.post('/new', async (req,res) => {
  const newProduct = req.body;
  if (req.body.type === "keyboard") {
    await Product.create({
      name: newProduct.name,
      price: newProduct.price,
      image: newProduct.image,
      description: newProduct.description,
    });
  };
  if (req.body.type === "keycap") {
    await Keycap.create({
      name: newProduct.name,
      price: newProduct.price,
      image: newProduct.image,
      description: newProduct.description,
    });
  };
  if (req.body.type === "keyswitch") {
    await Switch.create({
      name: newProduct.name,
      price: newProduct.price,
      image: newProduct.image,
      description: newProduct.description,
    });
  };
  res.redirect('/');
});

router.get('/edit', async (req,res) => {
  const keycaps = await Keycap.find({});
  const keyboards = await Product.find({});
  const switches = await Switch.find({});
  let updatedItem;
  if (req.query.type === "keycap") {
    updatedItem = await Keycap.findById(req.query.id);
  }
  if (req.query.type === "keyboard") {
    updatedItem = await Product.findById(req.query.id);
  }
  if (req.query.type === "keyswitch") {
    updatedItem = await Switch.findById(req.query.id);
  }
  res.render('edit.ejs', {keycaps: keycaps, keyboards: keyboards, switches: switches, updatedItem: updatedItem});
});

module.exports = {router: router, cart: cart};