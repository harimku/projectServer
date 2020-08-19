const express = require('express');
const bodyParser = require('body-parser');
const Pet = require('../models/pet');

const petRouter = express.Router();

petRouter.use(bodyParser.json());

petRouter.route('/')
.get((req, res, next) => {
    Pet.find()   //returns promise
    .then(pets => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pets);
    })
    .catch(err => next(err));   //pass err off to the overall error handler for this express application
})
.post((req, res, next) => {
    Pet.create(req.body)   //returns promise (mongoose checks if data fits schema)
    .then(pet => {
        console.log('Product Created ', pet);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pet);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /pets`);
})
.delete((req, res, next) => {
    Pet.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

petRouter.route('/:productId')
.get((req, res, next) => {
    Pet.findById(req.params.productId)
    .then(pet => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pet);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /pets/${req.params.productId}`);
})
.put((req, res, next) => {
    Pet.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, { new: true })
    .then(pet => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pet);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Pet.findByIdAndDelete(req.params.productId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = petRouter;