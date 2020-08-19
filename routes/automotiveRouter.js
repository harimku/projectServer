const express = require('express');
const bodyParser = require('body-parser');
const Automotive = require('../models/automotive');

const automotiveRouter = express.Router();

automotiveRouter.use(bodyParser.json());

automotiveRouter.route('/')
.get((req, res, next) => {
    Automotive.find()   //returns promise
    .then(automotives => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(automotives);
    })
    .catch(err => next(err));   //pass err off to the overall error handler for this express application
})
.post((req, res, next) => {
    Automotive.create(req.body)   //returns promise (mongoose checks if data fits schema)
    .then(automotive => {
        console.log('Product Created ', automotive);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(automotive);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /automotives`);
})
.delete((req, res, next) => {
    Automotive.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

automotiveRouter.route('/:productId')
.get((req, res, next) => {
    Automotive.findById(req.params.productId)
    .then(automotive => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(automotive);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /automotives/${req.params.productId}`);
})
.put((req, res, next) => {
    Automotive.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, { new: true })
    .then(automotive => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(automotive);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Automotive.findByIdAndDelete(req.params.productId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = automotiveRouter;