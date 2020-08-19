const express = require('express');
const bodyParser = require('body-parser');
const Fashion = require('../models/fashion');

const fashionRouter = express.Router();

fashionRouter.use(bodyParser.json());

fashionRouter.route('/')
.get((req, res, next) => {
    Fashion.find()   //returns promise
    .then(fashions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fashions);
    })
    .catch(err => next(err));   //pass err off to the overall error handler for this express application
})
.post((req, res, next) => {
    Fashion.create(req.body)   //returns promise (mongoose checks if data fits schema)
    .then(fashion => {
        console.log('Product Created ', fashion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fashion);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /fashions`);
})
.delete((req, res, next) => {
    Fashion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

fashionRouter.route('/:productId')
.get((req, res, next) => {
    Fashion.findById(req.params.productId)
    .then(fashion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fashion);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /fashions/${req.params.productId}`);
})
.put((req, res, next) => {
    Fashion.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, { new: true })
    .then(fashion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fashion);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Fashion.findByIdAndDelete(req.params.productId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = fashionRouter;