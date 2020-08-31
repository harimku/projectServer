const express = require('express');
const bodyParser = require('body-parser');
const Homedecor = require('../models/homedecor');
const authenticate = require('../authenticate');

const homedecorRouter = express.Router();

homedecorRouter.use(bodyParser.json());

homedecorRouter.use(bodyParser.json())
homedecorRouter.get('/', getHomedecors)
homedecorRouter.post('/', authenticate.verifyUser, authenticate.verifyAdmin, postHomedecors)
homedecorRouter.put('/', authenticate.verifyUser, authenticate.verifyAdmin, putHomedecors)
homedecorRouter.delete('/', authenticate.verifyUser, authenticate.verifyAdmin, deleteHomedecors)
homedecorRouter.get('/:productId', getItem)
homedecorRouter.post('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, postItem)
homedecorRouter.put('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, putItem)
homedecorRouter.delete('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, deleteItem)

async function getHomedecors (req, res) {
    try {
        const homedecors = await Homedecor.find();
        res.status(200).json(homedecors);
    } catch (err) {
        res.status(500).json('Could not find homedecors!');
    }
}

async function postHomedecors (req, res) {
    try {
        const homedecors = await Homedecor.create(req.body);
        console.log('Product Created ', homedecors);
        res.status(200).json(homedecors);
    } catch (err) {
        res.status(500).json('Could not post homedecors!');
    }
}

async function putHomedecors (req, res) {
    try {
        res.status(403).end(`PUT operation not supported on /homedecors`);
    } catch (err) {
        res.status(500).json('Operation failed.');
    }
}

async function deleteHomedecors (req, res) {
    try {
        const response = await Homedecor.deleteMany();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json('Could not delete homedecors!');
    }
}

async function getItem (req, res) {
    try {
        const item = await Homedecor.findById(req.params.productId);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json('Could not find item!');
    }
}

async function postItem (req, res) {
    try {
        res.status(403).end(`POST operation not supported on /homedecors/${req.params.productId}`);
    } catch (err) {
        res.status(500).json(`Could not post item!`)
    }
}

async function putItem (req, res) {
    try {
        const item = await Homedecor.findByIdAndUpdate(
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
        const response = await Homedecor.findByIdAndDelete(req.params.productId);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(`Could not delete item!`)
    }
}


/*
homedecorRouter
    .route('/')
    .get((req, res, next) => {
        Homedecor.find()
            .then(homedecors => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(homedecors);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Homedecor.create(req.body)
            .then(homedecor => {
                console.log('Product Created ', homedecor);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(homedecor);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /homedecors`);
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Homedecor.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

homedecorRouter
    .route('/:productId')
    .get((req, res, next) => {
        Homedecor.findById(req.params.productId)
            .then(homedecor => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(homedecor);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /homedecors/${req.params.productId}`);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Homedecor.findByIdAndUpdate(
            req.params.productId, 
            { $set: req.body }, 
            { new: true }
        )
            .then(homedecor => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(homedecor);
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Homedecor.findByIdAndDelete(req.params.productId)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });
*/

module.exports = homedecorRouter;