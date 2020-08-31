const express = require('express');
const bodyParser = require('body-parser');
const Fashion = require('../models/fashion');
const authenticate = require('../authenticate');

const fashionRouter = express.Router();

fashionRouter.use(bodyParser.json());

fashionRouter.use(bodyParser.json())
fashionRouter.get('/', getFashions)
fashionRouter.post('/', authenticate.verifyUser, authenticate.verifyAdmin, postFashions)
fashionRouter.put('/', authenticate.verifyUser, authenticate.verifyAdmin, putFashions)
fashionRouter.delete('/', authenticate.verifyUser, authenticate.verifyAdmin, deleteFashions)
fashionRouter.get('/:productId', getItem)
fashionRouter.post('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, postItem)
fashionRouter.put('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, putItem)
fashionRouter.delete('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, deleteItem)

async function getFashions (req, res) {
    try {
        const fashions = await Fashion.find();
        res.status(200).json(fashions);
    } catch (err) {
        res.status(500).json('Could not find fashions!');
    }
}

async function postFashions (req, res) {
    try {
        const fashions = await Fashion.create(req.body);
        console.log('Product Created ', fashions);
        res.status(200).json(fashions);
    } catch (err) {
        res.status(500).json('Could not post fashions!');
    }
}

async function putFashions (req, res) {
    try {
        res.status(403).end(`PUT operation not supported on /fashions`);
    } catch (err) {
        res.status(500).json('Operation failed.');
    }
}

async function deleteFashions (req, res) {
    try {
        const response = await Fashion.deleteMany();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json('Could not delete fashions!');
    }
}

async function getItem (req, res) {
    try {
        const item = await Fashion.findById(req.params.productId);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json('Could not find item!');
    }
}

async function postItem (req, res) {
    try {
        res.status(403).end(`POST operation not supported on /fashions/${req.params.productId}`);
    } catch (err) {
        res.status(500).json(`Could not post item!`)
    }
}

async function putItem (req, res) {
    try {
        const item = await Fashion.findByIdAndUpdate(
            req.params.productId, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json(`Could not update item!`)
    }
}

async function deleteItem (req, res) {
    try {
        const response = await Fashion.findByIdAndDelete(req.params.productId);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(`Could not delete item!`)
    }
}

/*
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
*/

module.exports = fashionRouter;