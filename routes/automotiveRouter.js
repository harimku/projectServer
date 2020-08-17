const express = require('express');
const bodyParser = require('body-parser');

const automotiveRouter = express.Router();

automotiveRouter.use(bodyParser.json());

automotiveRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the automotive products to you');
})
.post((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('POST operation not supported on /automotive');
})
.put((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('PUT operation not supported on /automotive');
})
.delete((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('DELETE operation not supported on /automotive');
});

automotiveRouter.route('/:productId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the automotive product: ${req.params.productId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /automotive/${req.params.productId}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /automotive/${req.params.productId}`);
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /automotive/${req.params.productId}`);
});


module.exports = automotiveRouter;