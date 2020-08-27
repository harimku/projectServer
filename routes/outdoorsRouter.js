const express = require('express');
const bodyParser = require('body-parser');
const Outdoor = require('../models/outdoor');
const authenticate = require('../authenticate');

const outdoorRouter = express.Router();

outdoorRouter.use(bodyParser.json());

outdoorRouter
    .route('/')
    .get((req, res, next) => {
        Outdoor.find()
            .then(outdoors => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(outdoors);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Outdoor.create(req.body)
            .then(outdoor => {
                console.log('Product Created ', outdoor);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(outdoor);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /outdoors`);
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Outdoor.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

outdoorRouter
    .route('/:productId')
    .get((req, res, next) => {
        Outdoor.findById(req.params.productId)
            .then(outdoor => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(outdoor);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /outdoors/${req.params.productId}`);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Outdoor.findByIdAndUpdate(
            req.params.productId, 
            { $set: req.body }, 
            { new: true }
        )
            .then(outdoor => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(outdoor);
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Outdoor.findByIdAndDelete(req.params.productId)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

module.exports = outdoorRouter;