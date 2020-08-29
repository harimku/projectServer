const express = require('express');
const bodyParser = require('body-parser');
const Cartitem = require('../models/cartitem');
const authenticate = require('../authenticate');

const cartRouter = express.Router();

cartRouter.use(bodyParser.json());
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
        console.error(err);
    }
}

async function postCart (req, res) {
    try {
        req.body.user = req.user._id;
        const cartitem = await Cartitem.create(req.body);
        res.status(200).json(cartitem);
    } catch (err) {
        console.error(err);
    }
}

async function putCart (req, res) {
    try {
        res.status(403).end(`PUT operation not supported on /cartitems`);
    } catch (err) {
        console.error(err);
    }
}

async function deleteCart (req, res) {
    try {
        res.status(403).end(`DELETE operation not supported on /cartitems`);
    } catch (err) {
        console.error(err);
    }
}

async function getCartItem (req, res) {
    try {
        const cartitem = await Cartitem.findById(req.params.productId).populate('user')
        cartitem ?
      
            (cartitem.user.equals(req.user._id)) ?
            res.status(200).json(cartitem) : res.status(403).json('This is not an item in your cart!')
            : res.status(403).json('This is not an item in your cart!')
              
    } catch (err) {
        res.status(403).json('This is not an item in your cart!')
    }
}

async function postCartItem (req, res) {
    try {
        res.status(403).end(`POST operation not supported on /cartitems/${req.params.productId}`);
    } catch (err) {
        console.error(err);
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
            err = new Error('This is not an item in your cart!');
            err.status = 403;
            return next(err);
        }
    } catch (err) {
       err => next(err);
    }
}

async function deleteCartItem (req, res) {
    try {
        const cartitem = await Cartitem.findById(req.params.productId);
        if (cartitem.user.equals(req.user._id)){
            res.status(200).json(cartitem);
            Cartitem.findByIdAndDelete(req.params.productId)
                .then(response => {
                    res.status(200).json(response);
                })
                .catch(err => next(err));
        } else {
            err = new Error('This is not an item in your cart!');
            err.status = 403;
            return next(err);
        }
    } catch (err) {
       err => next(err);
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