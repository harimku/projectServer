const express = require('express');
const bodyParser = require('body-parser');
const Automotive = require('../models/automotive');
const authenticate = require('../authenticate');

const automotiveRouter = express.Router();

automotiveRouter.use(bodyParser.json());

automotiveRouter
    .route('/')
    .get((req, res, next) => {
        Automotive.find()
            .then(automotives => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(automotives);
            })
            .catch(err => next(err));   
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Automotive.create(req.body)
            .then(automotive => {
                console.log('Product Created ', automotive);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(automotive);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /automotives`);
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Automotive.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

automotiveRouter
    .route('/:productId')
    .get((req, res, next) => {
        Automotive.findById(req.params.productId)
            .then(automotive => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(automotive);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /automotives/${req.params.productId}`);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        Automotive.findByIdAndUpdate(
            req.params.productId, 
            { $set: req.body }, 
            { new: true }
        )
            .then(automotive => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(automotive);
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Automotive.findByIdAndDelete(req.params.productId)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

module.exports = automotiveRouter;