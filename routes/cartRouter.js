const express = require('express');
const bodyParser = require('body-parser');
const Cartitem = require('../models/cartitem');
const authenticate = require('../authenticate');

const cartRouter = express.Router();

cartRouter.use(bodyParser.json())
cartRouter.get('/', authenticate.verifyUser, getCart)
cartRouter.post('/', authenticate.verifyUser, postCart)
cartRouter.put('/', authenticate.verifyUser, putCart)
cartRouter.delete('/', authenticate.verifyUser, deleteCart)
cartRouter.get('/:productId', authenticate.verifyUser, getCartItem)
cartRouter.post('/:productId', authenticate.verifyUser, postCartItem)
cartRouter.put('/:productId', authenticate.verifyUser, putCartItem)
cartRouter.delete('/:productId', authenticate.verifyUser, deleteCartItem)

async function getCart (req, res) {
    try {
        const cartitems = await Cartitem.find({ user: req.user._id }).populate('user')
        res.status(200).json(cartitems);
    } catch (err) {
        res.status(500).json(`Could not get items in cart!`)
    }
}

async function postCart (req, res) {
    try {
        req.body.user = req.user._id;
        const cartitem = await Cartitem.create(req.body);
        res.status(200).json(cartitem);
    } catch (err) {
        res.status(500).json(`Could not post item to cart!`)
    }
}

async function putCart (req, res) {
    try {
        res.status(403).end(`PUT operation not supported on /cartitems`);
    } catch (err) {
        res.status(500).json(`Could not update item!`)
    }
}

async function deleteCart (req, res) {
    try {
        res.status(403).end(`DELETE operation not supported on /cartitems`);
    } catch (err) {
        res.status(500).json(`Could not delete item!`)
    }
}

async function getCartItem (req, res) {
    try {
        const cartitem = await Cartitem.findById(req.params.productId).populate('user')
        if (cartitem.user.equals(req.user._id)) {
            res.status(200).json(cartitem)
        } else {
            res.status(403).json('This is not an item in your cart!')
        }
    } catch (err) {
        res.status(500).json(`Could not find cart item!`)
    }
}

async function postCartItem (req, res) {
    try {
        res.status(403).end(`POST operation not supported on /cartitems/${req.params.productId}`);
    } catch (err) {
        res.status(500).json(`Could not post item to cart!`)
    }
}

async function putCartItem (req, res) {
    try {
        const cartitem = await Cartitem.findByIdAndUpdate(
            req.params.productId, 
            { $set: req.body }, 
            { new: true }
            ).populate('user');

        if (cartitem.user.equals(req.user._id)) {
            res.status(200).json(cartitem);
        } else {
            res.status(403).json('This is not an item in your cart!');
        }
    } catch (err) {
        res.status(500).json(`Could not update cart item!`)
    }
}

async function deleteCartItem (req, res) {
    try {
        const cartitem = await Cartitem.findById(req.params.productId);
        if (cartitem.user.equals(req.user._id)) {
            const response = await Cartitem.findByIdAndDelete(req.params.productId);
            res.status(200).json(response);
        } else {
            res.status(403).json('This is not an item in your cart!');
        }
    } catch (err) {
        res.status(500).json(`Could not delete cart item!`)
    }
}

        
/*
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
                console.log('Product added to cart: ', cartitem);
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
        res.statusCode = 403;
        res.end(`DELETE operation not supported on /cartitems`);
    });

cartRouter
    .route('/:productId')
    .get(authenticate.verifyUser, (req, res, next) => {
        Cartitem.findById(req.params.productId)
            .populate('user')
            .then(cartitem => {
                if (cartitem.user.equals(req.user._id)) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(cartitem);
                } else {
                    err = new Error('This is not an item in your cart!');
                    err.status = 403;
                    return next(err);
                }
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
                if (cartitem.user.equals(req.user._id)) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(cartitem);
                } else {
                    err = new Error('This is not an item in your cart!');
                    err.status = 403;
                    return next(err);
                }
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Cartitem.findById(req.params.productId)
            .then(cartitem => {
                if (cartitem.user.equals(req.user._id)) {
                    Cartitem.findByIdAndDelete(req.params.productId)
                        .then(response => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(response);
                        })
                        .catch(err => next(err));
                } else {
                    err = new Error('This is not an item in your cart!');
                    err.status = 403;
                    return next(err);
                }
            })
            .catch(err => next(err));
    });
*/


module.exports = cartRouter;