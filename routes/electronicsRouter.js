const express = require('express');
const bodyParser = require('body-parser');
const Electronic = require('../models/electronic');
const authenticate = require('../authenticate');

const electronicsRouter = express.Router();

electronicsRouter.use(bodyParser.json());

electronicsRouter
    .route('/')
    .get((req, res, next) => {
        Electronic.find()
            .then(electronics => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(electronics);
            })
            .catch(err => next(err));   
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Electronic.create(req.body)
            .then(electronic => {
                console.log('Product Created ', electronic);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(electronic);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /electronics`);
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Electronic.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

electronicsRouter
    .route('/:productId')
    .get((req, res, next) => {
        Electronic.findById(req.params.productId)
            .then(electronic => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(electronic);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /electronics/${req.params.productId}`);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Electronic.findByIdAndUpdate(
            req.params.productId, 
            { $set: req.body }, 
            { new: true }
        )
            .then(electronic => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(electronic);
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Electronic.findByIdAndDelete(req.params.productId)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });


module.exports = electronicsRouter;