const express = require('express');
const bodyParser = require('body-parser');
const Pet = require('../models/pet');
const authenticate = require('../authenticate');

const petRouter = express.Router();

petRouter.use(bodyParser.json());

petRouter
    .route('/')
    .get((req, res, next) => {
        Pet.find()
            .then(pets => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(pets);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Pet.create(req.body)
            .then(pet => {
                console.log('Product Created ', pet);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(pet);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /pets`);
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Pet.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

petRouter
    .route('/:productId')
    .get((req, res, next) => {
        Pet.findById(req.params.productId)
            .then(pet => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(pet);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /pets/${req.params.productId}`);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        Pet.findByIdAndUpdate(
            req.params.productId,
            { $set: req.body },
            { new: true }
        )
            .then(pet => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(pet);
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Pet.findByIdAndDelete(req.params.productId)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

module.exports = petRouter;