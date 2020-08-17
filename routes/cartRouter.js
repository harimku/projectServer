const express = require('express');
const bodyParser = require('body-parser');

const cartRouter = express.Router();

cartRouter.use(bodyParser.json());

cartRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all products in cart to you');
})
.post((req, res) => {
    res.end(`Will add the product: ${req.body.name} to cart`);
})
.put((req, res) => {
    res.end(`Will update the product: ${req.body.name} in cart`);
})
.delete((req, res) => {
    res.end('Deleting all items in cart');
});

module.exports = cartRouter;