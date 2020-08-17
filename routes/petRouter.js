const express = require('express');
const bodyParser = require('body-parser');

const petRouter = express.Router();

petRouter.use(bodyParser.json());

petRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the pet products to you');
})
.post((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('POST operation not supported on /pet');
})
.put((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('PUT operation not supported on /pet');
})
.delete((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('DELETE operation not supported on /pet');
});

petRouter.route('/:productId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the pet product: ${req.params.productId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /pet/${req.params.productId}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /pet/${req.params.productId}`);
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /pet/${req.params.productId}`);
});


module.exports = petRouter;