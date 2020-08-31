const express = require('express');
const bodyParser = require('body-parser');
const Automotive = require('../models/automotive');
const authenticate = require('../authenticate');

const automotiveRouter = express.Router();

automotiveRouter.use(bodyParser.json());

automotiveRouter.use(bodyParser.json())
automotiveRouter.get('/', getAuto)
automotiveRouter.post('/', authenticate.verifyUser, authenticate.verifyAdmin, postAuto)
automotiveRouter.put('/', authenticate.verifyUser, authenticate.verifyAdmin, putAuto)
automotiveRouter.delete('/', authenticate.verifyUser, authenticate.verifyAdmin, deleteAuto)
automotiveRouter.get('/:productId', getItem)
automotiveRouter.post('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, postItem)
automotiveRouter.put('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, putItem)
automotiveRouter.delete('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, deleteItem)

async function getAuto (req, res) {
    try {
        const autos = await Automotive.find();
        res.status(200).json(autos);
    } catch (err) {
        res.status(500).json('Could not find automotives!');
    }
}

async function postAuto (req, res) {
    try {
        const auto = await Automotive.create(req.body);
        console.log('Product Created ', auto);
        res.status(200).json(auto);
    } catch (err) {
        res.status(500).json('Could not post automotive!');
    }
}

async function putAuto (req, res) {
    try {
        res.status(403).end(`PUT operation not supported on /automotives`);
    } catch (err) {
        console.error(err);
    }
}

async function deleteAuto (req, res) {
    try {
        const response = await Automotive.deleteMany();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json('Could not delete automotives!');
    }
}

async function getItem (req, res) {
    try {
        const item = await Automotive.findById(req.params.productId);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json('Could not find item!');
    }
}

async function postItem (req, res) {
    try {
        res.status(403).end(`POST operation not supported on /automotives/${req.params.productId}`);
    } catch (err) {
        res.status(500).json(`Could not post item!`)
    }
}

async function putItem (req, res) {
    try {
        const item = await Automotive.findByIdAndUpdate(
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
        const response = await Automotive.findByIdAndDelete(req.params.productId);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(`Could not delete item!`)
    }
}

/*
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
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Automotive.create(req.body)
            .then(automotive => {
                console.log('Product Created ', automotive);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(automotive);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /automotives`);
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /automotives/${req.params.productId}`);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Automotive.findByIdAndDelete(req.params.productId)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });
*/

module.exports = automotiveRouter;