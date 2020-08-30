const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');

const router = express.Router();

router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, getUsers);
router.post('/signup', registerUser);
router.post('/login', passport.authenticate('local'), loginUser);
router.post('/logout', logoutUser);

async function getUsers (req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
    }
}   
      
async function registerUser (req, res) {
    try {
        const user = await User.register(new User({ 
            username: req.body.username, 
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        }),
        req.body.password);
        const saved = await user.save;
        passport.authenticate('local')(req, res, () => {
            res.status(200).json({ success: true, status: 'Registration Successful!' });
        });
    } catch {
        console.error(err);
    }
}

async function loginUser (req, res) {
    try {
        const token = authenticate.getToken({ _id: req.user._id });
        res.status(200).json({
            success: true,
            token: token,
            status: 'You are successfully logged in!',
        });
    } catch (err) {
        console.error(err);
    }
}

    
async function logoutUser (req, res) {

}


/*
// GET users listing. 
router
    .route('/')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        User.find()
            .then((users) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(users);
            })
            .catch((err) => next(err));
    });

router.post('/signup', (req, res) => {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            } else {
                if (req.body.firstname) {
                    user.firstname = req.body.firstname;
                }
                if (req.body.lastname) {
                    user.lastname = req.body.lastname;
                }
                user.save(err => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/jason');
                        res.json({ err: err });
                        return;
                    }
                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, status: 'Registration Successful!' });
                    });
                });
            }
        }
    );
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    const token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        success: true,
        token: token,
        status: 'You are successfully logged in!',
    });
});

router.get('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        const err = new Error('You are not logged in!');
        err.status = 401;
        return next(err);
    }
});
*/

module.exports = router;