const express = require('express');
const bodyParser = require('body-parser');

const fashionRouter = express.Router();

fashionRouter.use(bodyParser.json());

fashionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the fashion products to you');
})
.post((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('POST operation not supported on /fashion');
})
.put((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('PUT operation not supported on /fashion');
})
.delete((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('DELETE operation not supported on /fashion');
});

fashionRouter.route('/:productId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the fashion product: ${req.params.productId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /fashion/${req.params.productId}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /fashion/${req.params.productId}`);
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /fashion/${req.params.productId}`);
});


module.exports = fashionRouter;