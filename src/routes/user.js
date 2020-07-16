let express = require('express');
let UserModel = require('../models/user.model');
let router = express.Router();

//Create a new user --> post method
router.post('/user', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    UserModel.create(req.body)
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }

            res.status(201).send(doc);
        })
        .catch(err => {
            res.status(500).json(err);
            res.status(500).send('same user already exists');
        })
});

//Get a user
router.get('/user', (req, res) => {
    if(!req.query.email) {
        res.status(400).send('query param is missing');
    }
    UserModel.findOne({
        email: req.query.email
    })
    .then(doc => {
        res.status(201).send(doc);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

//Update existing user --> put method
router.put('/user', (req,res) => {
    if(!req.query.email) {
        res.status(400).send('query param is missing');
    }
    UserModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {
        new: true
    })
    .then(doc => {
        res.status(201).send(doc);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

//Delete a particular user --> delet method
router.delete('/user', (req, res) => {
    if(!req.query.email) {
        res.status(400).send('query param is missing');
    }
    UserModel.findOneAndDelete({
        email: req.query.email
    })
    .then(doc => {
        res.status(201).send(doc);
    })
    .catch(doc => {
        res.status(500).send(error);
    })
})

module.exports = router;