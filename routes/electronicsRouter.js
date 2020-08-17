const express = require('express');
const bodyParser = require('body-parser');

const electronicsRouter = express.Router();

electronicsRouter.use(bodyParser.json());

electronicsRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the electronics products to you');
})
.post((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('POST operation not supported on /electronics');
})
.put((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('PUT operation not supported on /electronics');
})
.delete((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('DELETE operation not supported on /electronics');
});

electronicsRouter.route('/:productId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the electronics product: ${req.params.productId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /electronics/${req.params.productId}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /electronics/${req.params.productId}`);
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /electronics/${req.params.productId}`);
});


module.exports = electronicsRouter;