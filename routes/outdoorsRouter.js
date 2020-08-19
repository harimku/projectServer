const express = require('express');
const bodyParser = require('body-parser');
const Outdoor = require('../models/outdoor');

const outdoorRouter = express.Router();

outdoorRouter.use(bodyParser.json());

outdoorRouter.route('/')
.get((req, res, next) => {
    Outdoor.find()   //returns promise
    .then(outdoors => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(outdoors);
    })
    .catch(err => next(err));   //pass err off to the overall error handler for this express application
})
.post((req, res, next) => {
    Outdoor.create(req.body)   //returns promise (mongoose checks if data fits schema)
    .then(outdoor => {
        console.log('Product Created ', outdoor);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(outdoor);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /outdoors`);
})
.delete((req, res, next) => {
    Outdoor.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

outdoorRouter.route('/:productId')
.get((req, res, next) => {
    Outdoor.findById(req.params.productId)
    .then(outdoor => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(outdoor);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /outdoors/${req.params.productId}`);
})
.put((req, res, next) => {
    Outdoor.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, { new: true })
    .then(outdoor => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(outdoor);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Outdoor.findByIdAndDelete(req.params.productId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = outdoorRouter;