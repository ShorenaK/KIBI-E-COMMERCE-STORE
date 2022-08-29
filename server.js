const express = require('express');
const app = express();
const PORT = 4005;
require('./config/db.connection');
const methodOverride = require('method-override');
const productsController = require('./controllers/products_controller')
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/products', productsController)
app.set('view engine','ejs');


app.get('/',(req, res)=>{
  res.render('home.ejs')
})

app.get('/*', (req, res) => {
  res.render('404.ejs')
})

app.listen(PORT, ()=>{
    console.log(`Server up at http://localhost:${PORT}`)
})