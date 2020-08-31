const express = require('express');
const bodyParser = require('body-parser');
const Pet = require('../models/pet');
const authenticate = require('../authenticate');

const petRouter = express.Router();

petRouter.use(bodyParser.json());

petRouter.use(bodyParser.json())
petRouter.get('/', getPets)
petRouter.post('/', authenticate.verifyUser, authenticate.verifyAdmin, postPets)
petRouter.put('/', authenticate.verifyUser, authenticate.verifyAdmin, putPets)
petRouter.delete('/', authenticate.verifyUser, authenticate.verifyAdmin, deletePets)
petRouter.get('/:productId', getItem)
petRouter.post('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, postItem)
petRouter.put('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, putItem)
petRouter.delete('/:productId', authenticate.verifyUser, authenticate.verifyAdmin, deleteItem)

async function getPets (req, res) {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (err) {
        res.status(500).json('Could not find pets!');
    }
}

async function postPets (req, res) {
    try {
        const pets = await Pet.create(req.body);
        console.log('Product Created: ', pets);
        res.status(200).json(pets);
    } catch (err) {
        res.status(500).json('Could not post pets!');
    }
}

async function putPets (req, res) {
    try {
        res.status(403).end(`PUT operation not supported on /pets`);
    } catch (err) {
        res.status(500).json('Operation failed.');
    }
}

async function deletePets (req, res) {
    try {
        const response = await Pet.deleteMany();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json('Could not delete pets!');
    }
}

async function getItem (req, res) {
    try {
        const item = await Pet.findById(req.params.productId);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json('Could not find item!');
    }
}

async function postItem (req, res) {
    try {
        res.status(403).end(`POST operation not supported on /pets/${req.params.productId}`);
    } catch (err) {
        res.status(500).json(`Could not post item!`)
    }
}

async function putItem (req, res) {
    try {
        const item = await Pet.findByIdAndUpdate(
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
        const response = await Pet.findByIdAndDelete(req.params.productId);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(`Could not delete item!`)
    }
}

/*
petRouter
    .route('/')
    .get((req, res, next) => {
        Pet.find()
            .then(pets => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(pets);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Pet.create(req.body)
            .then(pet => {
                console.log('Product Created ', pet);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(pet);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /pets`);
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Pet.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

petRouter
    .route('/:productId')
    .get((req, res, next) => {
        Pet.findById(req.params.productId)
            .then(pet => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(pet);
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /pets/${req.params.productId}`);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Pet.findByIdAndUpdate(
            req.params.productId,
            { $set: req.body },
            { new: true }
        )
            .then(pet => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(pet);
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Pet.findByIdAndDelete(req.params.productId)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });
*/

module.exports = petRouter;