const express = require('express');
const bodyParser = require('body-parser');
const Electronic = require('../models/electronic');
const authenticate = require('../authenticate');

const electronicsRouter = express.Router();

electronicsRouter.use(bodyParser.json());

electronicsRouter.use(bodyParser.json())
electronicsRouter.get('/', getElectronics)
electronicsRouter.post('/', authenticate.verifyUser, authenticate.verifyAdmin, postElectronics)
electronicsRouter.put('/', authenticate.verifyUser, authenticate.verifyAdmin, putElectronics)
electronicsRouter.delete('/', authenticate.verifyUser, authenticate.verifyAdmin, deleteElectronics)
electronicsRouter.get('/:productId', getItem)
electronicsRouter.post('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, postItem)
electronicsRouter.put('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, putItem)
electronicsRouter.delete('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, deleteItem)

async function getElectronics (req, res) {
    try {
        const electronics = await Electronic.find();
        res.status(200).json(electronics);
    } catch (err) {
        res.status(500).json('Could not find electronics!');
    }
}

async function postElectronics (req, res) {
    try {
        const electronics = await Electronic.create(req.body);
        console.log('Product Created ', electronics);
        res.status(200).json(electronics);
    } catch (err) {
        res.status(500).json('Could not post electronics!');
    }
}

async function putElectronics (req, res) {
    try {
        res.status(403).end(`PUT operation not supported on /electronics`);
    } catch (err) {
        res.status(500).json('Operation failed.');
    }
}

async function deleteElectronics (req, res) {
    try {
        const response = await Electronic.deleteMany();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json('Could not delete electronics!');
    }
}

async function getItem (req, res) {
    try {
        const item = await Electronic.findById(req.params.productId);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json('Could not find item!');
    }
}

async function postItem (req, res) {
    try {
        res.status(403).end(`POST operation not supported on /electronics/${req.params.productId}`);
    } catch (err) {
        res.status(500).json(`Could not post item!`)
    }
}

async function putItem (req, res) {
    try {
        const item = await Electronic.findByIdAndUpdate(
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
        const response = await Electronic.findByIdAndDelete(req.params.productId);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(`Could not delete item!`)
    }
}

/*
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
*/

module.exports = electronicsRouter;