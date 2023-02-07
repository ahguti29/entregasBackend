const { response } = require('express');
const ProductManager = require('./productManager');
const express = require('express')

const product = './products.json';
const products = new ProductManager(product)
const app = express();


app.listen(8080, () => console.log('Server Up'));

app.get('/', (req, res) => {
    res.send('Pagina Principal')
})

app.get('/products', async(req, res) => {
    try{
        let myProducts = await JSON.parse(products.getProducts());
        let limit = parseInt(req.query.limit);
        if (limit) {
            myProducts = myProducts.slice(0, limit);
        }
        res.send(myProducts);
    } catch (error) {
        res.send({ error });
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
      let product = await products.getProductsById(parseInt(req.params.pid));
      
       if (product) {
        res.send({product});
      } else {
        res.send({error : "Producto no encontrado"});
      } 
    } catch (error) {
      res.send({ error });
    }
  });