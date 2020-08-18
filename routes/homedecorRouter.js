const express = require('express');
const bodyParser = require('body-parser');
const Homedecor = require('../models/homedecor');

const homedecorRouter = express.Router();

homedecorRouter.use(bodyParser.json());

homedecorRouter.route('/')
.get((req, res, next) => {
    Homedecor.find()   //returns promise
    .then(homedecors => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(homedecors);
    })
    .catch(err => next(err));   //pass err off to the overall error handler for this express application
})
.post((req, res, next) => {
    Homedecor.create(req.body)   //returns promise (mongoose checks if data fits schema)
    .then(homedecor => {
        console.log('Product Created ', homedecor);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(homedecor);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /homedecors`);
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

homedecorRouter.route('/:productId')
.get((req, res, next) => {
    Homedecor.findById(req.params.productId)
    .then(homedecor => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(homedecor);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /homedecors/${req.params.productId}`);
})
.put((req, res, next) => {
    Homedecor.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, { new: true })
    .then(homedecor => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(homedecor);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Homedecor.findByIdAndDelete(req.params.productId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = homedecorRouter;