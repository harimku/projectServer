const express = require('express');
const bodyParser = require('body-parser');
const Cartitem = require('../models/cartitem');
const authenticate = require('../authenticate');

const cartRouter = express.Router();

cartRouter.use(bodyParser.json());

cartRouter
    .route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        Cartitem.find({"user": req.user._id})
            .populate('user')
            .then(cartitems => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cartitems);
            })
            .catch(err => next(err));   
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        req.body.user = req.user._id;
        Cartitem.create(req.body)
            .then(cartitem => {
                console.log('Product Created ', cartitem);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cartitem);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /cartitems`);
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Cartitem.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

cartRouter
    .route('/:productId')
    .get(authenticate.verifyUser, (req, res, next) => {
        Cartitem.findById(req.params.productId)
            .populate('user')
            .then(cartitem => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cartitem);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /cartitems/${req.params.productId}`);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        Cartitem.findByIdAndUpdate(
            req.params.productId, 
            { $set: req.body }, 
            { new: true }
        )
            .then(cartitem => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cartitem);
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Cartitem.findByIdAndDelete(req.params.productId)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

module.exports = cartRouter;