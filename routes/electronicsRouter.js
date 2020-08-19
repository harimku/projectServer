const express = require('express');
const bodyParser = require('body-parser');
const Electronic = require('../models/electronic');

const electronicsRouter = express.Router();

electronicsRouter.use(bodyParser.json());

electronicsRouter.route('/')
.get((req, res, next) => {
    Electronic.find()   //returns promise
    .then(electronics => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(electronics);
    })
    .catch(err => next(err));   //pass err off to the overall error handler for this express application
})
.post((req, res, next) => {
    Electronic.create(req.body)   //returns promise (mongoose checks if data fits schema)
    .then(electronic => {
        console.log('Product Created ', electronic);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(electronic);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /electronics`);
})
.delete((req, res, next) => {
    Homedecor.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

electronicsRouter.route('/:productId')
.get((req, res, next) => {
    Electronic.findById(req.params.productId)
    .then(electronic => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(electronic);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /electronics/${req.params.productId}`);
})
.put((req, res, next) => {
    Electronic.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, { new: true })
    .then(electronic => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(electronic);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Electronic.findByIdAndDelete(req.params.productId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


module.exports = electronicsRouter;