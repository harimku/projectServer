const express = require('express');
const bodyParser = require('body-parser');

const homedecorRouter = express.Router();

homedecorRouter.use(bodyParser.json());

homedecorRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the homedecor products to you');
})
.post((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('POST operation not supported on /homedecor');
})
.put((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('PUT operation not supported on /homedecor');
})
.delete((req, res) => {
    res.statusCode = 403;  //operation not supported
    res.end('DELETE operation not supported on /homedecor');
});

homedecorRouter.route('/:productId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the homedecor product: ${req.params.productId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /homedecor/${req.params.productId}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /homedecor/${req.params.productId}`);
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /homedecor/${req.params.productId}`);
});


module.exports = homedecorRouter;