const express = require('express');
const bodyParser = require('body-parser');
const Fashion = require('../models/fashion');
const authenticate = require('../authenticate');

const fashionRouter = express.Router();

fashionRouter.use(bodyParser.json());

fashionRouter
    .route('/')
    .get((req, res, next) => {
        Fashion.find()
            .then(fashions => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fashions);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Fashion.create(req.body)
            .then(fashion => {
                console.log('Product Created ', fashion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fashion);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /fashions`);
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Fashion.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

fashionRouter
    .route('/:productId')
    .get((req, res, next) => {
        Fashion.findById(req.params.productId)
            .then(fashion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fashion);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /fashions/${req.params.productId}`);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Fashion.findByIdAndUpdate(
            req.params.productId, 
            { $set: req.body }, 
            { new: true }
        )
            .then(fashion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fashion);
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Fashion.findByIdAndDelete(req.params.productId)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

module.exports = fashionRouter;