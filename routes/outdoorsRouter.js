const express = require('express');
const bodyParser = require('body-parser');
const Outdoor = require('../models/outdoor');
const authenticate = require('../authenticate');

const outdoorRouter = express.Router();

outdoorRouter.use(bodyParser.json());

outdoorRouter.use(bodyParser.json())
outdoorRouter.get('/', getOutdoors)
outdoorRouter.post('/', authenticate.verifyUser, authenticate.verifyAdmin, postOutdoors)
outdoorRouter.put('/', authenticate.verifyUser, authenticate.verifyAdmin, putOutdoors)
outdoorRouter.delete('/', authenticate.verifyUser, authenticate.verifyAdmin, deleteOutdoors)
outdoorRouter.get('/:productId', getItem)
outdoorRouter.post('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, postItem)
outdoorRouter.put('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, putItem)
outdoorRouter.delete('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, deleteItem)

async function getOutdoors (req, res) {
    try {
        const outdoors = await Outdoor.find();
        res.status(200).json(outdoors);
    } catch (err) {
        res.status(500).json('Could not find outdoors!');
    }
}

async function postOutdoors (req, res) {
    try {
        const outdoors = await Outdoor.create(req.body);
        console.log('Product Created ', outdoors);
        res.status(200).json(outdoors);
    } catch (err) {
        res.status(500).json('Could not post outdoors!');
    }
}

async function putOutdoors (req, res) {
    try {
        res.status(403).end(`PUT operation not supported on /outdoors`);
    } catch (err) {
        res.status(500).json('Operation failed.');
    }
}

async function deleteOutdoors (req, res) {
    try {
        const response = await Outdoor.deleteMany();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json('Could not delete outdoors!');
    }
}

async function getItem (req, res) {
    try {
        const item = await Outdoor.findById(req.params.productId);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json('Could not find item!');
    }
}

async function postItem (req, res) {
    try {
        res.status(403).end(`POST operation not supported on /outdoors/${req.params.productId}`);
    } catch (err) {
        res.status(500).json(`Could not post item!`)
    }
}

async function putItem (req, res) {
    try {
        const item = await Outdoor.findByIdAndUpdate(
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
        const response = await Outdoor.findByIdAndDelete(req.params.productId);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(`Could not delete item!`)
    }
}

/*
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
*/

module.exports = outdoorRouter;