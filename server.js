const express = require('express');
const app = express();
const PORT = process.env.PORT || 4005;
require('./config/db.connection');
const methodOverride = require('method-override');
const productsController = require('./controllers/products_controller')
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/products', productsController.router)
app.set('view engine','ejs');


app.get('/',(req, res)=>{
  res.render('home.ejs');
});

app.get('/cart', (req,res) => {
  res.render('cart.ejs', {cart: productsController.cart});
});

app.post('/cart', (req,res) => {
  // send data from cart to financial system / inventory management system here in a real world application
  res.redirect('/thanks');
});

app.get('/thanks', (req,res) => {
  res.render('thanks.ejs')
})

app.get('/*', (req, res) => {
  res.render('404.ejs');
});

app.listen(PORT);